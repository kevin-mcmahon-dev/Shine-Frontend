import React, {useState, useEffect} from 'react';
import DataModel from '../models/conversations';
import authorizationModel from '../models/authorization';
import {useParams, useNavigate} from "react-router-dom";
import "./ConversationShow.css"

const ConversationShow = () => {
    const {id} = useParams();
    const [conversation, setConversation] = useState([]);
    const [user, setUser] = useState("");
    const [content, setContent] = useState({});

    const nav = useNavigate();
    const userArray = conversation.user

    useEffect(function() {
        console.log("I'm using Effect")
        fetchConversation()
        fetchUser()
        fetchContent()
    }, [])

    useEffect(function() {
        console.log(conversation.messages)
        generateMessageList(conversation.messages)
        console.log(conversation.messages)
    }, [conversation])

    function fetchConversation() {
        DataModel.conversationShow(id).then((data) => {
            console.log(data.conversation);
            setConversation(data.conversation);
        })
    }

    function fetchContent() {
        setContent("")
    }

    function fetchUser() {
        authorizationModel.profile().then((data) => {
            setUser(data.user);
        })
    }

    function generateUserList(input) {
        if (input) {
            return input.map((profile, index) => (
                <>
                    {profile._id !== user._id ? <span>{profile.username}</span> : null}
                </>
            ));
        }
    }
    console.log(conversation.messages);
    const messageArray = conversation.messages
    
    function generateMessageList(inputMessages) {
        if (inputMessages) {
            let newArr = inputMessages.map((input, index) => {
                if (index >= 1 && inputMessages[index - 1].user._id === input.user._id) {
                    return {
                        _id: input.user._id,
                        content: input.content
                    }
                } else {
                    return {
                        _id: input.user._id,
                        user: input.user.name,
                        content: input.content
                    }
                } 
            })

            return newArr.map((input, index) => (
                <>

                {input._id === user._id ? 
                    <div className="currentUserSet">
                        <p className="currentUserName">{input.user}</p> 
                        <p className="currentUserContent">{input.content} </p>
                    </div>
                    : <div className="otherUserSet">
                        <p className="otherUserName">{input.user}</p> 
                        <p className="otherUserContent">{input.content} </p>
                    </div>}
                </>
            ));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        DataModel.createMessage(id, content).then((response) => {
            fetchConversation()
            fetchUser()
            fetchContent()
        })
    }

    function handleDelete(event) {
        event.preventDefault();

        DataModel.conversationDelete(id).then((response) => {
            nav(`/profile`)
        })
    }

    return (
        <>
            <div>
                <h1>Conversation with {generateUserList(userArray)}</h1>
                <div className="conversationContainer">
                    {generateMessageList(conversation.messages)}
                </div>
            </div>

            <form onSubmit={(event) => handleSubmit(event)}>
                <div className='input-field form-group'>
					<input type='text'
						name='content'
                        className='form-control messageBox'
                        placeholder='Enter Message'
						onChange={(e) => setContent(e.target.value)}
						value={content}
					/>
				</div>
                <button type='submit' className='btn btn-primary'>Send Message</button>
            </form>
            <form onSubmit={(event) => handleDelete(event)}>
                <button type='submit' className='btn btn-danger'>Delete Conversation</button>
            </form>
        </>
    );
}

export default ConversationShow;

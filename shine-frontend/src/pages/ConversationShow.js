import React, {useState, useEffect} from 'react';
import DataModel from '../models/conversations';
import authorizationModel from '../models/authorization';
// import useAccount from "../hooks/useAccount";
// import {Params} from "../config/routing";
import {useParams, useNavigate} from "react-router-dom";
import "./ConversationShow.css"

const ConversationShow = () => {
    const {id} = useParams();
    // console.log(id);
    const [conversation, setConversation] = useState([]);
    const [user, setUser] = useState("");
    const [content, setContent] = useState({});
    // content: ""
    const nav = useNavigate();
    // console.log({id});
    console.log(id)

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
            // console.log(data);
            // console.log(id);
            console.log(data.conversation);
            setConversation(data.conversation);
        })
    }
    function fetchContent() {
        setContent("Enter Message")
    }

    function fetchUser() {
        authorizationModel.profile().then((data) => {
            // console.log(data);
            // console.log(id);
            setUser(data.user);
        })
    }
    // console.log(JSON.stringify(conversation, null, 2));
    const userArray = conversation.user

    function generateUserList(input) {
        if (input) {
            // const objectToArray = Object.values(input);

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

    console.log(content);
    console.log(user._id);
    function handleSubmit(event) {
        event.preventDefault();

        // (id, {content: "hello"})
        DataModel.createMessage(id, content).then((response) => {
            console.log(response);
            console.log(content);
            // localStorage.setItem("uid", response.signedJwt);
            fetchConversation()
            fetchUser()
            fetchContent()
            // if (response.status === 200) {
            //     console.log("Wow");
            //     fetchConversation()
            //     fetchUser()
            // }
            // generateMessageList(conversation.messages)
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
                
                {/* <h1>Conversation between {conversation.user[0].username} and {conversation.user[1].username}</h1> */}
                <div className="conversationContainer">
                    {generateMessageList(conversation.messages)}
                </div>
                
                {/* <div>{generateMessageList(messageArray)} </div> */}
                {/* {JSON.stringify(conversation, null, 2)} */}
                {/* <h2>{conversation.user[0].name}</h2> */}
                {/* <img src={conversation.avatar}></img> */}
            </div>

            <form onSubmit={(event) => handleSubmit(event)}>
                <div className='input-field form-group'>
					{/* <label htmlFor='content'>Content</label> */}
					<input type='text'
						name='content'
                        className='form-control messageBox'
                        placeholder='Message'
						onChange={(e) => setContent(e.target.value)}
						value={content}
					/>
				</div>
                {/* <input type='submit' value='Send Message' /> */}
                <button type='submit' className='btn btn-primary'>Send Message</button>
            </form>
            <form onSubmit={(event) => handleDelete(event)}>
                <button type='submit' className='btn btn-danger'>Delete Conversation</button>
            </form>
        </>
    );
}

export default ConversationShow;

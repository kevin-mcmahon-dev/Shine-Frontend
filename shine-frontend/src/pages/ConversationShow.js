import React, {useState, useEffect} from 'react';
import DataModel from '../models/conversations';
import authorizationModel from '../models/authorization';
// import useAccount from "../hooks/useAccount";
// import {Params} from "../config/routing";
import {useParams, useNavigate} from "react-router-dom";

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

            return input.map((user, index) => (
                <span> {user.name} | </span>
            ));
        }
    }
    console.log(conversation.messages);
    const messageArray = conversation.messages

    
    function generateMessageList(inputMessages) {
        if (inputMessages) {
            // const objectToArray = Object.values(input);
            // console.log(typeof inputMessages);
            return inputMessages.map((input, index) => (
                
                    <div>
                        <p>{input.user.name}</p>
                        <p>{input.content}</p>
                    </div>
                
            ));
        }
    }

    console.log(content);
    console.log(id);
    function handleSubmit(event) {
        event.preventDefault();

        // (id, {content: "hello"})
        DataModel.createMessage(id, content).then((response) => {
            console.log(response);
            console.log(content);
            // localStorage.setItem("uid", response.signedJwt);
            if (response.status === 200) {
                console.log("Wow");
                nav(`/conversations/${id}`)
            }
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
                <h1>Conversation with | {generateUserList(userArray)}</h1>
                {generateMessageList(conversation.messages)}
                {/* <div>{generateMessageList(messageArray)} </div> */}
                {/* {JSON.stringify(conversation, null, 2)} */}
                {/* <h2>{conversation.user[0].name}</h2> */}
                {/* <img src={conversation.avatar}></img> */}
            </div>

            <form onSubmit={(event) => handleSubmit(event)}>
            <div className='input-field'>
					{/* <label htmlFor='content'>Content</label> */}
					<input type='text'
						name='content'
						onChange={(e) => setContent(e.target.value)}
						value={content}
					/>
				</div>
                <input type='submit' value='Send Message' />
            </form>
            <form onSubmit={(event) => handleDelete(event)}>
                <input type='submit' value='Delete Conversation' />
            </form>
        </>
    );
}

export default ConversationShow;

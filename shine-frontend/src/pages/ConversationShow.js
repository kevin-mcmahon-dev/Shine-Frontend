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
            let newArr = inputMessages.map((input, index) => {
                if (input.user._id === user._id) {
                    return {
                        _id: input.user._id,
                        user: input.user.name,
                        content: input.content
                    }
                } else if (input.user) {
                    return {
                        _id: input.user._id,
                        user: input.user.name,
                        content: input.content
                    }
                } else {
                    return {
                        _id: null,
                        user: null,
                        content: input.content
                    }
                }
            })
            console.log(newArr)
            // let placeholder
            // if (input.user._id === user._id) {
            //     placeholder = <>
            //         <p style={{ color: 'red' }}>{input.user.name}</p> 
            //         <p style={{ color: 'red' }}>{input.content} </p>
            //     </>
            // } else if (input.user) {
            //     placeholder = <>
            //         <p>{input.user.name}</p> 
            //         <p>{input.content} </p>
            //     </>
            // } else {
            //     placeholder = <p>{input.content} </p>
            // }
            return newArr.map((input, index) => (
                <div>
                    {/* style={{ textDecoration: 'none' }} */}
                    {/* {if (input.user === user) {
                        <>
                            <p style={{ color: 'red' }}>{input.user.name}</p> 
                            <p style={{ color: 'red' }}>{input.content} </p>
                        </>
                    } else if (input.user) {
                        <>
                            <p>{input.user.name}</p> 
                            <p>{input.content} </p>
                        </>
                    } else {
                        <p>{input.content} </p>
                    }} */}
            
                {/* Working one */}
                {input._id === user._id ? 
                    <div>
                        <p style={{ color: 'red' }}>{input.user}</p> 
                        <p style={{ color: 'red' }}>{input.content} </p>
                    </div>
                    : <div>
                        <p>{input.user}</p> 
                        <p>{input.content} </p>
                    </div>}
            
                {/* {input.user ? 
                    <div>
                    <p>{input.user.name}</p> 
                    <p>{input.content} </p>
                    </div>
                    : <p>{input.content} </p>} */}
                </div>
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
                <h1>Conversation with | {generateUserList(userArray)}</h1>
                {generateMessageList(conversation.messages)}
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
                        className='form-control'
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

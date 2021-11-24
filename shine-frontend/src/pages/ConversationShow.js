import React, {useState, useEffect} from 'react';
import DataModel from '../models/apiFetch';
// import useAccount from "../hooks/useAccount";
// import {Params} from "../config/routing";
import {useParams} from "react-router-dom";


const ConversationShow = () => {
    const {id} = useParams();
    // console.log(id);
    const [conversation, setConversation] = useState([]);
    // console.log({id});
    console.log(id)

    useEffect(function() {
        console.log("I'm using Effect")
        fetchConversation()
    }, [])

    function fetchConversation() {
        DataModel.conversationShow(id).then((data) => {
            // console.log(data);
            console.log(id);
            console.log(data);
            setConversation(data.conversation);
        })
    }
    console.log(conversation);
    console.log(conversation.name);
    console.log(conversation._id);
    console.log(conversation.avatar);
    console.log(conversation.user);
    return (
    <>
        <div>
            <h1>Welcome to {conversation.name} Conversation</h1>
            {/* <img src={conversation.avatar}></img> */}
        </div>
    </>
    );
}

export default ConversationShow;

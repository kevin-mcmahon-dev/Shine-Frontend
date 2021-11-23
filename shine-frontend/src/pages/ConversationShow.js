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
            setConversation(data.conversation);
        })
    }
    console.log(user);
    return (
    <>
        <div>
            <h1>Welcome to {conversation.name} Conversation</h1>
            <h4>Name: {conversation.user}</h4>
        </div>
    </>
    );
}

export default ConversationShow;

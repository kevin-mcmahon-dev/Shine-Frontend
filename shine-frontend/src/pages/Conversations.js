import React from 'react';
import DataModel from '../models/apiFetch';
import { useState, useEffect} from "react";

const Conversations = (props) => {
    const [conversations, setConversations] = useState([]);

    useEffect(
        function () {
            console.log("I'm using effect");
            fetchConversations();
        }, []
    )

    function fetchConversations() {
        console.log("I'm fetching conversations");
        DataModel.all().then((data) => {
            console.log(data);
            console.log(data.conversations);
            setConversations(data.conversations);
        });
    }

    function generateList(conversations) {
        console.log(conversations);
        return conversations.map((conversation, index) => (
            <h1>{conversation.name}</h1>
        ));
    }
  return (
    <div>
        <h1>Welcome to the Conversations Page</h1>
        {generateList(conversations)}
    </div>
  );
}

export default Conversations;
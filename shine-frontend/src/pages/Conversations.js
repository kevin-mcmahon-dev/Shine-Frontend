import React from 'react';
import DataModel from '../models/apiFetch';
import { useState, useEffect} from "react";

const Conversations = (props) => {
    const [conversations, setConversations] = useState([]);

    useEffect(
        function () {
            fetchConversations();
        }, []
    )

    function fetchConversations() {
        DataModel.all().then((data) => {
            setConversations(data.conversations);
        });
    }

    function generateList(conversations) {
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
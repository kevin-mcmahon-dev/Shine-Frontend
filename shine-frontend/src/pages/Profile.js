import {useState, useEffect} from 'react';
import authorizationModel from '../models/authorization';
// import useAccount from "../hooks/useAccount";
// import {Params} from "../config/routing";
import {BrowserRouter as Router, useParams, Link} from "react-router-dom";


const Profile = () => {
    const [user, setUser] = useState("");
    // const {id} = useParams();
    // console.log(id);
    // console.log({id});
    console.log(user)

    useEffect(function() {
        console.log("I'm using Effect")
        fetchUser()
    }, [])

    function fetchUser() {
        authorizationModel.profile().then((data) => {
            // console.log(data);
            // console.log(id);
            setUser(data.user);
        })
    }

    function generateList(input) {
        if (input) {
            const objectToArray = Object.values(input);

            return input.map((conversation, index) => (
                <Link to={`/conversations/${conversation._id}`}>
                    <h3>{conversation.name}</h3>
                </Link>
                //Link to conversation show @ {conversation._id}
                // <Link to=`/conversations/${conversation._id}`>Test </Link>
            ));
        }
    }

    const conversationArray = user.conversation;
    console.log(conversationArray)
    console.log(typeof conversationArray)
    // const objectToArray = Object.values(conversationArray);
    if (conversationArray) {
        const objectToArray = Object.values(conversationArray);
        // console.log(objectToArray)
        // console.log(objectToArray[0].name)
    }

    return (
    <>
        <div>
            <h1>Welcome to {user.username} Account!</h1>
            <h4>Name: {user.name}</h4>
            {generateList(conversationArray)}
        </div>
    </>
    );
}

export default Profile;

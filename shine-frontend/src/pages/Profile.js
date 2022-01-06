import {useState, useEffect} from 'react';
import authorizationModel from '../models/authorization';
import {BrowserRouter as Router, useParams, Link} from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState("");

    // console.log(user);
    // console.log(users);

    useEffect(function() {
        console.log("I'm using Effect")
        fetchUser()
    }, [])

    function fetchUser() {
        authorizationModel.profile().then((data) => {
            setUser(data.user);
            setUsers(data.users);
        })
    }

    const conversationArray = user.conversation;

    function generateList(input) {
        if (input) {
            return input.map((conversation, index) => (
                <Link to={`/conversations/${conversation._id}`}>
                    <h3>{conversation.name}</h3>
                </Link>
            ));
        }
    }
    
    function generateUserList(input) {
        if (input) {
            return input.map((profile, index) => (
                <>
                {/* {profile.username !== user.username ? profile.username : ""} */}
                {(profile.username !== user.username) && <li>{profile.username}</li> }
                </>
                // {if (profile.username !== user.username) {
                //     <li>{profile.username}</li>
                // } else {
                //     <li></li>
                // }}
            ));
        }
    }

    return (
    <>
        <div>
            <h1>Welcome to {user.username} Account!</h1>
            <h4>Name: {user.name}</h4>
            {generateList(conversationArray)}
            <h2>All Users:</h2>
            <ul>
                {generateUserList(users)}
            </ul>
        </div>
    </>
    );
}

export default Profile;

import {useState, useEffect} from 'react';
import authorizationModel from '../models/authorization';
import {BrowserRouter as Router, useParams, Link} from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState("");
    const [content, setContent] = useState({});

    let convoCreationUsers = {
        user: [`${user._id}`, `${content}`]
    }
    console.log(user);
    console.log(content);
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
                // <>
                // {/* {profile.username !== user.username ? profile.username : ""} */}
                // {(profile.username !== user.username) && <li>{profile.username}</li> }
                // </>
                // // {if (profile.username !== user.username) {
                // //     <li>{profile.username}</li>
                // // } else {
                // //     <li></li>
                // // }}
            <>
                {(profile.username !== user.username) && 
                <>
                    <input type='radio'
                    name='content'
                    onChange={(e) => setContent(e.target.value)}
                    value={profile._id}/>
                    <label>{profile.username}</label>
                </>}
                {/* {content} */}
            </>
            ));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        // (id, {content: "hello"})
        // authorizationModel.conversationCreate(user._id, content) --> two params instead?
        authorizationModel.conversationCreate(convoCreationUsers).then((response) => {
            // content = {
            //     user: [user._id, ]
            // }
            console.log(response);
            console.log(content);
            fetchUser()
        })
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
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className='input-field'>
					{/* <label htmlFor='content'>Content</label> */}
					{/* <input type='radio'
						name='content'
						onChange={(e) => setContent(e.target.value)}
						value={content}
					/> */}
			    </div>
                <input type='submit' value='Start Talking!' />
            </form>
        </div>
    </>
    );
}

export default Profile;

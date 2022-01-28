import {useState, useEffect} from 'react';
import authorizationModel from '../models/authorization';
import {BrowserRouter as Router, useParams, Link} from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState("");
    const [content, setContent] = useState({});
    const [search, setSearch] = useState("");

    let convoCreationUsers = {
        user: [`${user._id}`, `${content}`]
    }
    console.log(user);
    console.log(content);
    console.log(users);

    useEffect(function() {
        fetchUser()
    }, [])

    function fetchUser() {
        authorizationModel.profile().then((data) => {
            setUser(data.user);
            setUsers(data.users);
        })
    }

    const conversationArray = user.conversation;
    console.log(conversationArray)
    // Trying to remove duplicate convo entries
    // let conversationArray = new Set()
    // let userArray

    // for (let i = 0; i < user.conversation.length; i++) {
    //     conversationArray.add(user.converation[i].user)
    //     userArray = conversationArray.from(conversationArray)
    // }
    // console.log(conversationArray)
    // console.log(userArray)

    function generateList(input) {
        // console.log(user.conversation)
        if (input) {
            let userList = new Set()
            let convoList = []

            for (let i = 0; i < input.length; i++) {
                for (let j = 0; j < 2; j++) {
                    if (userList.has(input[i].user[j]) === false) {
                        if (input[i].user[j] !== user._id) {
                            userList.add(input[i].user[j])
                            convoList.push(input[i])
                        }
                    }
                }
            }
            console.log(convoList)
            return convoList.map((conversation, index) => (
                <Link to={`/conversations/${conversation._id}`}>
                    <h3>{conversation.name}</h3>
                </Link>
            ));
        }
        // fetchUser()
    }
    
    // function generateUserList(input) {
    //     if (input) {
    //         return input.map((profile, index) => (
    //             // <>
    //             // {/* {profile.username !== user.username ? profile.username : ""} */}
    //             // {(profile.username !== user.username) && <li>{profile.username}</li> }
    //             // </>
    //             // // {if (profile.username !== user.username) {
    //             // //     <li>{profile.username}</li>
    //             // // } else {
    //             // //     <li></li>
    //             // // }}
    //         <>
    //             {(profile.username !== user.username) && 
    //             <>
    //                 <input type='radio'
    //                 name='content'
    //                 onChange={(e) => setContent(e.target.value)}
    //                 value={profile._id}/>
    //                 <label>{profile.username}</label>
    //             </>}
    //             {/* {content} */}
    //         </>
    //         ));
    //     }
    // }

    function generateUserList(users, search) {
        if (users) {

            let filteredUsers = users.filter((user) => {
                const username = user.username.toLowerCase();
                return username.includes(search)
            })

            if (search !== "") {
                return (
                    <>
                        {filteredUsers.map(input => {
                            return (
                            <form onSubmit={(event) => handleSubmit(event)}>
                                <button type="submit" 
                                    value={input._id} 
                                    onClick={(e) => setContent(e.target.value)}>
                                    {input.username}
                                </button>
                            </form>
                            // <button className="searchResult" onSubmit={(event) => handleSubmit(event)}>{input.username}</button>
                            //             {/* <form onSubmit={(event) => handleSubmit(event)}>
                            //     <div className='input-field'>
                            //         {generateUserList(users)}
			                //     </div>
                            //     <input type='submit' value='Start Talking!' />
                            // </form> */}
                            )
                        })}
                    </>
                )
            }
        }
    }
    console.log(content)

    function handleSubmit(event) {
        event.preventDefault();

        // (id, {content: "hello"})
        // authorizationModel.conversationCreate(user._id, content) --> two params instead?
        authorizationModel.conversationCreate(convoCreationUsers).then((response) => {
            // content = {
            //     user: [user._id, ]
            // }
            // console.log(response.conversation._id);
            // console.log(response.conversation.user);
            // console.log(response)
            // newConvoId = response.conversation._id
            console.log(content);
            authorizationModel.accountUpdate()
            // fetchUser() /* redundant */
        })

        fetchUser()
    }

    // function handleSearch(event) {
    //     event.preventDefault();

    //     authorizationModel.profileSearch(search).then((response) => {
    //         console.log(search)
    //         console.log(response)
    //     })
    //     fetchUser()
    // }
    // console.log(typeof search)

    return (
    <>
        <div>
            <h1>Welcome to {user.username} Account!</h1>
            <h4>Name: {user.name}</h4>
            {generateList(conversationArray)}
            <h2>All Users:</h2>
            {/* <ul>
                {generateUserList(users)}
            </ul> */}

            {/* Search Form */}
                {/* <label htmlFor="search">Find Other Users!</label> */}
                {/* <form onSubmit={(event) => generateUserList(users, search)}> */}
                <input type="text" 
                placeholder="Search by Username"
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
                {/* <button type="submit">Search</button> */}
                {generateUserList(users, search)}
                {/* </form> */}
            
            
            {/* Radial Form */}
            {/* <form onSubmit={(event) => handleSubmit(event)}>
                <div className='input-field'>
                    {generateUserList(users)}
			    </div>
                <input type='submit' value='Start Talking!' />
            </form> */}
        </div>
    </>
    );
}

export default Profile;

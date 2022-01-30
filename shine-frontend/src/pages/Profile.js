import {useState, useEffect} from 'react';
import authorizationModel from '../models/authorization';
import {BrowserRouter as Router, useParams, useNavigate, Link} from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState("");
    const [content, setContent] = useState({});
    const [search, setSearch] = useState("");

    let convoCreationUsers = {
        user: [`${user._id}`, `${content}`]
    }

    // console.log(localStorage.getItem("uid"));

    useEffect(function() {
        fetchUser()
    }, [])

    console.log(users[0])
    function fetchUser() {
        authorizationModel.profile().then((data) => {
            setUser(data.user);
            setUsers(data.users);
            console.log(data.users)
        })
    }

    const conversationArray = user.conversation;
    console.log(conversationArray)
    console.log(users)
    function generateList(input) {
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
            let nameList = convoList.map(value => {
                if (value.user[0] === user._id) {
                    for (let i = 0; i < users.length; i++) {
                        if (value.user[1] === users[i]._id) {
                            return users[i].username
                        }
                    }
                } else {
                    for (let i = 0; i < users.length; i++) {
                        if (value.user[0] === users[i]._id) {
                            return users[i].username
                        }
                    }
                }
            })

            convoList.forEach((value, index) => {
                value.name = nameList[index]
            })

            return convoList.map((conversation, index) => (
                <Link to={`/conversations/${conversation._id}`}>
                    <h3>Conversation with {conversation.name}</h3>
                </Link>
            ));
        }
    }

    function generateUserList(users, search) {
        if (users) {

            let filteredUsers = users.filter((user) => {
                const username = user.username.toLowerCase();
                const lowercaseSearch = search.toLowerCase()
                return username.includes(lowercaseSearch)
            })
            console.log(content)
            console.log(search)
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

        authorizationModel.conversationCreate(convoCreationUsers).then((response) => {
            authorizationModel.accountUpdate()
            // generateList(conversationArray)
            // fetchUser()
        })

        generateList(conversationArray)
        fetchUser()
        // setUser(user)
        // reload()
    }

    // function reload() {
    //     window.location.reload()
    // }
    
    return (
    <>
        <div>
            <h1>Welcome to Shine {user.username}!</h1>
            {generateList(conversationArray)}
            <h2>Find Users to Chat With:</h2>

            <input type="text" 
            placeholder="Search by Username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
            {/* {search !== "" ? generateUserList(users, search) : null} */}
            {/* {if ({search} !== "") {generateUserList(users, search)}} */}
            {generateUserList(users, search)}
        </div>
    </>
    );
}

export default Profile;

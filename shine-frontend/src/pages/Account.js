import React, {useState, useEffect} from 'react';
import DataModel from '../models/apiFetch';
// import useAccount from "../hooks/useAccount";
// import {Params} from "../config/routing";
import {useParams} from "react-router-dom";


const Account = () => {
    const {id} = useParams();
    // console.log(id);
    const [user, setUser] = useState([]);
    // console.log({id});
    console.log(id)

    useEffect(function() {
        console.log("I'm using Effect")
        fetchUser()
    }, [])

    function fetchUser() {
        DataModel.show(id).then((data) => {
            // console.log(data);
            console.log(id);
            setUser(data.user);
        })
    }
    console.log(user);
    return (
    <>
        <div>
            <h1>Welcome to {user.username} Account!</h1>
            <h4>Name: {user.name}</h4>
        </div>
    </>
    );
}

export default Account;

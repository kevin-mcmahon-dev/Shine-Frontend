import React from 'react';
import DataModel from '../models/apiFetch';
import useAccount from "../hooks/useAccount";

const Account = (props) => {
    const [user, setUser] = useAccount(props.match.params.id)

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

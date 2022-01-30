const url = 'http://localhost:4000/api/v1'
// const url = 'https://shineserver.herokuapp.com/api/v1'

class authorizationModel {
    static register = (data) => {
        return fetch(`${url}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
    }
    
    static login = (data) => {
        return fetch(`${url}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
    };

    static profile = (data) => {
        return fetch(`${url}/profile`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.uid}`,
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
    };

    static conversationCreate = (data) => {
        return fetch(`${url}/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.uid}`,
            },
            body: JSON.stringify(data),
        }).then((res) => res.json());
    };

    static accountUpdate = (data) => {
        return fetch(`${url}/profile`, {
            // credentials: "include",
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.uid}`,
            },
            body: JSON.stringify(data)
        }).then((res) => res.json());
    }

    static profileSearch = (data) => {
        console.log(typeof data)
        return fetch(`${url}/profiles`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({"username": data})
        }).then((res) => {
            console.log(res)
            res.json()
        });
    }
}
    
export default authorizationModel;
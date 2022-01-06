const url = 'http://localhost:4000/api/v1/conversations'

class DataModel {
    static all = () => {
        // the fetch API will not parse JSON in the response automatically so we handle it in the first .then()
        return fetch(`${url}`).then(res => res.json()) 
            // console.log(res.json());
    }

    // Need to update this url to something else. What is this being used for?
    static show = (id) => {
        return fetch(`${url}/${id}`).then(res => res.json())
    }

    static conversationShow = (id) => {  
        return fetch(`${url}/${id}`).then(res => res.json())
    }

    static createMessage = (id, data) => {
        console.log(typeof data)
        console.log(typeof id)
        console.log(`${url}/${id}`)

        return fetch(`${url}/${id}`, {
            // credentials: "include",
            method: 'PUT',
            body: JSON.stringify({"content": data})
        })
        .then(res => {
            console.log(res)
            return res.json()
        })
    }

    static conversationDelete = (id) => {
        return fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(data)
        })
        .then(res => {
            res.json()
        })
    }
}

export default DataModel
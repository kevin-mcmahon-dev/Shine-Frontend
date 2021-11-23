const url = 'http://localhost:4000/api/v1'

class DataModel {
    static all = () => {
        // the fetch API will not parse JSON in the response automatically so we handle it in the first .then()
        return fetch(`${url}/conversations`).then(res => res.json())
    }

    static show = (id) => {
        return fetch(`${url}/${id}`).then(res => res.json())
    }

    static conversationShow = (id) => {
        return fetch(`${url}/conversations/${id}`).then(res => res.json())
    }
}

export default DataModel
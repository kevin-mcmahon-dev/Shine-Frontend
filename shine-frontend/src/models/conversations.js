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
}

export default DataModel
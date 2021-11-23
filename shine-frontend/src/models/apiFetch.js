const url = 'mongodb://localhost:4000/api/shine'

class DataModel {
    static all = () => {
        // the fetch API will not parse JSON in the response automatically so we handle it in the first .then()
        return fetch(`${url}/conversations`).then(res => res.json())
    }

    static show = (id) => {
        return fetch(`${url}/${id}`).then(res => res.json())
    }
}

export default DataModel
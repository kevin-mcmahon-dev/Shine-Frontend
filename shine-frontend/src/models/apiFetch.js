const url = 'mongodb://localhost:27017/shineserver'

class DataModel {
    // static all = () => {
    //     // the fetch API will not parse JSON in the response automatically so we handle it in the first .then()
    //     return fetch(`${url}/games`).then(res => res.json())
    // }

    static show = (id) => {
        return fetch(`${url}/${id}`).then(res => res.json())
    }
}
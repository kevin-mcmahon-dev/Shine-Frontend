import { useState, useEffect } from "react";

import DataModel from "../models/apiFetch";

function useAccount(id) {
    const [user, setUser] = useState([]);

    function fetchUser(id) {
        if (id) {
            DataModel.show(id).then((data) => {
                setUser(data.user);
            })
        }
    }

    useEffect(
        function () {
            fetchUser(id);
        }, [id]
    );
}

export default useAccount;
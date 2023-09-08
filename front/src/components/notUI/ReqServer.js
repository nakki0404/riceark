//./components/reqServer.js
import axios from "axios";

function fetchData() {

    return axios.get(process.env.REACT_APP_BACKEND_URL+'/data')
    // return axios.get(`${process.env.REACT_APP_BACKEND_URL}/data`)
    // return axios.get(`${process.env.REACT_APP_BACKEND_URL}/data`)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}

export default fetchData;
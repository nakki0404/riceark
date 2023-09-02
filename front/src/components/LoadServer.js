//./components/LoadServer.js
import axios from "axios";

function LoadServer() {
    
    return axios.get(process.env.REACT_APP_BACKEND_URL+'/load')
    .then(response => response.data)
        .catch(error => {
            throw error;
        });
}
export default LoadServer;


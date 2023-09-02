//./components/LoadServer.js
import axios from "axios";

function LoadReport() {
    
    return axios.get(process.env.REACT_APP_BACKEND_URL +'/loadreport')
    .then(response => response.data)
        .catch(error => {
            throw error;
        });
}
export default LoadReport;


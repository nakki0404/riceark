//./components/loadTrading_data.js
import axios from "axios";

function loadTrading_data() {
    
    return axios.get(process.env.REACT_APP_BACKEND_URL+'/trade')
    .then(response => response.data)
        .catch(error => {
            throw error;
        });
}
export default loadTrading_data;


import axios from "axios";
// const BASE_URL = 'https://npiregistry.cms.hhs.gov/api';
const BASE_URL = 'http://localhost:8080';

/* Set Axios Default URL and API Key if needed */
const instance = axios.create({
    baseURL: BASE_URL,
    headers:{"Content-Type":'application/json'
           }
})

export default instance;
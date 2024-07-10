import axios from 'axios';

const BaseService = axios.create({
    timeout: 60000,
    baseURL:' http://127.0.0.1:8000/api/',
    headers: {
    'Content-type': 'application/json'
    }
})

export default BaseService
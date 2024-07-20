import axios from 'axios';

const api = axios.create({
    // baseURL:'http://localhost:8000'
    baseURL:'https://todo-backend-xuiz.onrender.com/'
})

export default api
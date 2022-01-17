import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8890/sparql'
})

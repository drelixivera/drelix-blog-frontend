import axios from 'axios';

// this detect if the app is running on localhost or on the live web
const isLocalhost = window.location.hostname === 'localhost';

// this automatically set the backend destination target based on the environment
const API_URL = isLocalhost
    ? 'http://localhost:5000' // local development
    : ' https://drelix-blog-backend.onrender.com'; // production

const API = axios.create({
    baseURL: API_URL
});

export default API;
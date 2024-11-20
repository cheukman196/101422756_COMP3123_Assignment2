import axios from 'axios';

// Axios: custom configuration
// changed all axios imports to using this

axios.defaults.withCredentials = true; // send cookies on all requests
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5010';

export default axios;
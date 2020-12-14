import axios from 'axios';

const url = '192.168.0.187';

export default axios.create({
    baseURL: `http://${url}:8080`,
});

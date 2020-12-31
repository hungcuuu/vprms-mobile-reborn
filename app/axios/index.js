import axios from 'axios';

const url = '192.168.0.196';

// const url = '192.168.0.187';
// const url = '192.168.0.186';

export default axios.create({
    baseURL: `http://${url}:8080`,
});

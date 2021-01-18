import axios from 'axios';

// const url = '192.168.0.196';
// const url = '10.0.2.2';
// const url = '192.168.0.187';

const url = '192.168.1.84';

// const url = '192.168.0.185';
// const url = '192.168.0.186';

export default axios.create({
    baseURL: `http://${url}:8080`,
});

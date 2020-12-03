import axios from 'axios';

const url = '10.0.2.2';

export default axios.create({
  baseURL: `http://${url}/api`,
});

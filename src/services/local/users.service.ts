import axios from 'axios';

export const getUser = async () => {
  return axios.get('/api/users');
};

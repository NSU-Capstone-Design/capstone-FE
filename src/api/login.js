import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';

export default async (data) => {
  const api = axios.create({
    baseURL: BASE_URL,
  });
  const res = await api.post('/users/login/', {
    user_id: data.user_id,
    password: data.password,
  });
  return res.data;
};

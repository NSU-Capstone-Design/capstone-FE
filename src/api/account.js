import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';
const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
const authenticatedApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${window.localStorage.getItem('access')}`,
  },
});
export const login_api = async (data) => {
  const res = await baseApi.post('users/token/', {
    user_id: data.user_id,
    password: data.password,
  });
  return res.data;
};

export const sign_up_api = async (data) => {
  const res = await baseApi.post('/users/create/', {
    user_id: data.user_id,
    email: data.email,
    password: data.password,
    nickname: data.nickname,
  });
  return res.data;
};

export const check_token = () => {
  return authenticatedApi
    .post('/users/token/verify/', {
      token: window.localStorage.getItem('access'),
    })
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      return err.response.status;
    });
};

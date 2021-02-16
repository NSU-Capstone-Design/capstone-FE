import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/';
const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
const authenticatedApi = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
  const token = window.localStorage.getItem('access');
  if (token !== '') {
    return baseApi
      .post('/users/token/verify/', {
        token,
      })
      .then((res) => {
        console.log('pass' + res.status);
        return res.status;
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status == 401) {
          // refresh 토큰으로 access토큰 받기
          baseApi
            .post('/users/token/refresh/', {
              refresh: window.localStorage.getItem('refresh'),
            })
            .then((res) => {
              console.log(res);
              window.localStorage.setItem('access', res.data.access);
              // 다시 access 토큰으로 요청
              baseApi
                .post('/users/token/verify/', {
                  token: window.localStorage.getItem('access'),
                })
                .then((res) => {
                  console.log('두번째 요청 ' + res.status);
                  return res.status;
                })
                .catch((e) => {
                  return 401;
                });
            })
            .catch((e) => {
              console.log('로그인 페이지로 리다이렉트');
            });
        }
        return 200;
      });
  }
};

export const test = () => {
  authenticatedApi(window.localStorage.getItem('access'))
    .get('/users/test/')
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

import { baseApi, authenticatedApi } from './axiosApi';

const FRONT_BASE_URL = 'http://127.0.0.1:3000';

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
                  window.alert('개발자에게 문의 부탁 드립니다.');
                  window.localStorage.removeItem('access');
                  window.localStorage.removeItem('refresh');
                  window.location.href = FRONT_BASE_URL + '/login';
                });
            })
            .catch((e) => {
              console.log('로그인 페이지로 리다이렉트');
            });
        }
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

export const myInfo = async () => {
  let data = {};
  await authenticatedApi(window.localStorage.getItem('access'))
    .get('/users/myInfo/')
    .then((res) => {
      data = res.data[0];
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        await authenticatedApi(window.localStorage.getItem('access'))
          .get('/users/myInfo/')
          .then((res) => {
            data = res.data[0];
          })
          .catch((err) => {
            console.log('이건 백엔드가 잘못했따');
            window.location.href = FRONT_BASE_URL + '/login';
          });
      } else {
        console.log('이또한 백엔드의 잘못이다');
        window.location.href = FRONT_BASE_URL + '/login';
      }
    });
  return data;
};

export const refreshAccessToken = async () => {
  const refreshToken = window.localStorage.getItem('refresh');
  if (refreshToken === '') {
    window.location.href = FRONT_BASE_URL + '/login';
  } else {
    let token;
    await baseApi
      .post('/users/token/refresh/', { refresh: refreshToken })
      .then((res) => {
        token = res.data.access;
      })
      .catch((err) => {
        window.localStorage.removeItem('access');
        window.localStorage.removeItem('refresh');
        window.location.href = FRONT_BASE_URL + '/login';
      });
    return token;
  }
};

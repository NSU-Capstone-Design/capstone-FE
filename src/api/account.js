import { baseApi, authenticatedApi, autoRefreshGET } from './axiosApi';

export const FRONT_BASE_URL = 'http://127.0.0.1:3000';

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

export const check_token = async () => {
  const token = window.localStorage.getItem('access');
  if (token !== undefined) {
    let result;
    await baseApi
      .post('/users/token/verify/', {
        token,
      })
      .then((res) => {
        result = res.status;
      })
      .catch(async (err) => {
        try {
          if (err.response.status == 401) {
            // refresh 토큰으로 access토큰 받기
            const accesToken = await refreshAccessToken();
            window.localStorage.setItem('access', accesToken);
            await baseApi
              .post('/users/token/verify/', {
                token: accesToken,
              })
              .then((res) => {
                result = res.status;
              })
              .catch(() => {
                window.alert('개발자에게 문의 부탁 드립니다.');
                window.localStorage.removeItem('access');
                window.localStorage.removeItem('refresh');
                window.location.href = FRONT_BASE_URL + '/login';
              });
          }
        } catch (e) {
          alert('현재 서버에서 장애가 있습니다. 잠시후 다시 이용해주세요 ㅜㅜ');
        }
      });
    return result;
  }
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

export const getLevelApi = async () => {
  let level;
  await authenticatedApi(window.localStorage.getItem('access'))
    .get('/users/level/')
    .then((res) => {
      level = res.data;
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        await authenticatedApi(window.localStorage.getItem('access'))
          .get('/users/level/')
          .then((res) => {
            level = res.data;
          })
          .catch((err) => {
            console.log('이건 백엔드가 잘못했따');
            // window.location.href = FRONT_BASE_URL + '/login';
          });
      } else {
        console.log('이또한 백엔드의 잘못이다');
        // window.location.href = FRONT_BASE_URL + '/login';
      }
    });
  return level;
};

export const getLevelTestProbs = async () => {
  let response;
  await authenticatedApi(window.localStorage.getItem('access'))
    .get('/level/level_test_probs/')
    .then((res) => {
      console.log('hi?');
      response = res.data;
    })
    .catch((err) => {
      console.err(err);
      response = 'error';
    });
  return response;
};

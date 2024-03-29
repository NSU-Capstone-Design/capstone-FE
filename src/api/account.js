import { baseApi, authenticatedApi } from './axiosApi';

export const FRONT_BASE_URL = 'http://localhost:3000';
// export const FRONT_BASE_URL =
//   'http://capstone-design.s3-website.ap-northeast-2.amazonaws.com';

// 이친구는 가장 일반적 요청
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
  if (Boolean(token) === true) {
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
          } else if (err.response.status == 400) {
            result = err.response.status;
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

// 토큰이 만료되었을때
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

export const withdrawalApi = async () => {
  return await authenticatedApi(window.localStorage.getItem('access'))
    .post('/users/withdrawal/')
    .then((res) => true)
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        return await authenticatedApi(window.localStorage.getItem('access'))
          .post('/users/withdrawal/')
          .then((res) => {
            return true;
          })
          .catch(async (err) => {
            return false;
          });
      }
      return false;
    });
};

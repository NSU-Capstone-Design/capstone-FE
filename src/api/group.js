import { baseApi, authenticatedApi, autoRefreshGET } from './axiosApi';
import { refreshAccessToken } from './account';
export const FRONT_BASE_URL = 'http://127.0.0.1:3000';

// 이친구는 가장 일반적 요청
export const login_api = async (data) => {
  const res = await baseApi.post('users/token/', {
    user_id: data.user_id,
    password: data.password,
  });
  return res.data;
};
//토큰이 만료되었을 때
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
//인증이 필요한 요청을 보낼 때
export const getLevelTestProbs = async () => {
  let response;
  await authenticatedApi(window.localStorage.getItem('access'))
    .get('/groups/grouplist')
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

export const getGroupList = async () => {
  let grouplist;
  await authenticatedApi(window.localStorage.getItem('access'))
    .get('/groups/grouplist/')
    .then((gl) => {
      console.log(gl, '_ldk');
      grouplist = gl.data;
    })
    .catch((err) => {
      console.log(err);
      grouplist = 'error';
    });
  return grouplist;
};

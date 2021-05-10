import { baseApi, authenticatedApi, autoRefreshGET } from './axiosApi';
import { refreshAccessToken } from './account';
export const FRONT_BASE_URL = 'http://127.0.0.1:3000';

// export const refreshAccessToken = async (pageId) => {
//   let token;
//   await baseApi
//     .get('/users/token/refresh/', { refresh: refreshToken })
//     .then((res) => {
//       token = res.data.access;
//     })
//     .catch((err) => {
//       window.localStorage.removeItem('access');
//       window.localStorage.removeItem('refresh');
//       window.location.href = FRONT_BASE_URL + '/login';
//     });
//   return token;
// };

// jsm

export const qaDetailApi = async (id) => {
  return await baseApi
    .get(`/question/view/?id=${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log('qadetailapi', err);
      return null;
    });
};

export const makeApi = async (data) => {
  return await authenticatedApi(window.localStorage.getItem('access'))
    .post('/question/write/', data)
    .then((res) => {
      console.log('write', res);
      return true;
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        return await authenticatedApi(window.localStorage.getItem('access'))
          .post('/question/write/', data)
          .then((res) => {
            console.log('write', res);
            return true;
          })
          .catch(async (err) => {
            console.log('write err', err);
            return false;
          });
      }
      console.log('write err', err);
      return false;
    });
};

export const myQuestionsApi = async () => {
  return await authenticatedApi(window.localStorage.getItem('access'))
    .get('/users/myQuestions/')
    .then((res) => res.data)
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        return await authenticatedApi(window.localStorage.getItem('access'))
          .get('/users/myQuestions/')
          .then((res) => {
            return res.data;
          })
          .catch(async (err) => {
            return [];
          });
      }
      return [];
    });
};

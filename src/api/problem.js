import { baseApi, authenticatedApi, autoRefreshGET } from './axiosApi';
import { refreshAccessToken } from './account';

export const FRONT_BASE_URL = 'http://127.0.0.1:3000';

export const getProbApi = async (prob_num) => {
  return await baseApi
    .get(`/problem/${prob_num}/`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
// export const getLevelApi = async () => {
//   let level;
//   await authenticatedApi(window.localStorage.getItem('access'))
//     .get('/users/level/')
//     .then((res) => {
//       level = res.data;
//     })
//     .catch(async (err) => {
//       if (err.request.status === 401) {
//         const accessToken = await refreshAccessToken();
//         window.localStorage.setItem('access', accessToken);
//         await authenticatedApi(window.localStorage.getItem('access'))
//           .get('/users/level/')
//           .then((res) => {
//             level = res.data;
//           })
//           .catch((err) => {
//             console.log('이건 백엔드가 잘못했따');
//             // window.location.href = FRONT_BASE_URL + '/login';
//           });
//       } else {
//         console.log('이또한 백엔드의 잘못이다');
//         // window.location.href = FRONT_BASE_URL + '/login';
//       }
//     });
//   return level;
// };

// export const getLevelTestProbs = async () => {
//   let response;
//   await authenticatedApi(window.localStorage.getItem('access'))
//     .get('/level/level_test_probs/')
//     .then((res) => {
//       console.log('hi?');
//       response = res.data;
//     })
//     .catch((err) => {
//       console.err(err);
//       response = 'error';
//     });
//   return response;
// };

// 성모쓰
export const userLevelProblemApi = async () => {
  return await authenticatedApi(window.localStorage.getItem('access'))
    .get('/problem/userLevel/')
    .then((res) => {
      return res.data;
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        return await authenticatedApi(window.localStorage.getItem('access'))
          .get('/problem/userLevel/')
          .then((res) => {
            return res.data;
          })
          .catch(async (err) => {
            return err.response;
          });
      }
      return err.response;
    });
};

export const nextProbApi = async (prob_id) => {
  return await authenticatedApi(window.localStorage.getItem('access'))
    .post('/solved_problem/success/', { prob_id })
    .then((res) => true)
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        return await authenticatedApi(window.localStorage.getItem('access'))
          .post('/solved_problem/success/', { prob_id })
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

export const passToNextProbApi = async (prob_id) => {
  return await authenticatedApi(window.localStorage.getItem('access'))
    .post('/solved_problem/pass/', { prob_id })
    .then((res) => true)
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        return await authenticatedApi(window.localStorage.getItem('access'))
          .post('/solved_problem/pass/', { prob_id })
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

export const increaseLevelApi = async () => {
  return await authenticatedApi(window.localStorage.getItem('access'))
    .post('/users/level/increase/')
    .then((res) => true)
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        return await authenticatedApi(window.localStorage.getItem('access'))
          .post('/users/level/increase/')
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

export const decreaseLevelApi = async () => {
  return await authenticatedApi(window.localStorage.getItem('access'))
    .post('/users/level/decrease/')
    .then((res) => true)
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        return await authenticatedApi(window.localStorage.getItem('access'))
          .post('/users/level/decrease/')
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

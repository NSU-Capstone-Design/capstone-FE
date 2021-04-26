import { baseApi, authenticatedApi, autoRefreshGET } from './axiosApi';

export const FRONT_BASE_URL = 'http://127.0.0.1:3000';

export const getProblem = async () => {
  let data;
  await baseApi
    .get('/problem/')
    .then((res) => {
      console.log(res);
      data = res.data;
    })
    .catch((err) => {
      console.error(err, '에러발생!!');
    });
  return data;
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
    .catch((err) => {
      console.error(err);
    });
};

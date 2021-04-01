import axios from 'axios';
import { refreshAccessToken, FRONT_BASE_URL } from './account';

export const BASE_URL = 'http://127.0.0.1:8000/';

export const baseApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// access token 을 항상 전달 해주세요
export const authenticatedApi = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

// export const autoRefreshGET = (url) => {
//   return async function temp() {
//     let data;
//     await authenticatedApi
//       .get(url)
//       .then((res) => {
//         data = res.data;
//       })
//       .catch(async (err) => {
//         if (err.request.status === 401) {
//           const accessToken = await refreshAccessToken();
//           window.localStorage.setItem('access', accessToken);
//           await authenticatedApi(window.localStorage.getItem('access'))
//             .get(url)
//             .then((res) => {
//               data = res.data;
//             })
//             .catch((err) => {
//               console.log('이건 백엔드가 잘못했따');
//               window.location.href = FRONT_BASE_URL + '/login';
//             });
//         } else {
//           console.log('이또한 백엔드의 잘못이다');
//           window.location.href = FRONT_BASE_URL + '/login';
//         }
//       });
//     return data;
//   };
// };

import { baseApi, authenticatedApi, autoRefreshGET } from './axiosApi';
import { refreshAccessToken } from './account';
export const FRONT_BASE_URL = 'http://127.0.0.1:3000';

export const refreshAccessToken = async (pageId) => {
    let token;
    await baseApi
      .get('/users/token/refresh/', { refresh: refreshToken })
      .then((res) => {
        token = res.data.access;
      })
      .catch((err) => {
        window.localStorage.removeItem('access');
        window.localStorage.removeItem('refresh');
        window.location.href = FRONT_BASE_URL + '/login';
      });
    return token;
};

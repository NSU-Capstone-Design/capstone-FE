import { baseApi, authenticatedApi, autoRefreshGET } from './axiosApi';
import { refreshAccessToken } from './account';
export const FRONT_BASE_URL = 'http://127.0.0.1:3000';

export const getGroupDetail = async (id) => {
  const token = window.localStorage.getItem('access');
  let groupdetail;
  await authenticatedApi(token)
    .get(`/groups/grouplist/${id}/`)
    .then((gd) => {
      groupdetail = gd.data;
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        await authenticatedApi(window.localStorage.getItem('access'))
          .get(`/groups/grouplist/${id}/`)
          .then((gd) => {
            groupdetail = gd.data;
          })
          .catch((err) => {
            console.log('여기 오류인가' + err);
            window.location.href = FRONT_BASE_URL + '/login';
          });
      } else {
        console.log('아니면 여기 오류인가' + err.request.status);
        window.location.href = FRONT_BASE_URL + '/login';
      }
    });
  return groupdetail;
};

export const getGroupManageList = async (id) => {
  const token = window.localStorage.getItem('access');
  let groupmanagelist;
  await authenticatedApi(token)
    .get(`groups/grouplist/${id}/gmlist/`)
    .then((gml) => {
      groupmanagelist = gml.data;
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        await authenticatedApi(window.localStorage.getItem('access'))
          .get(`groups/grouplist/${id}/gmlist/`)
          .then((gml) => {
            groupmanagelist = gml.data;
          })
          .catch((err) => {
            console.log('여기 오류인가' + err);
            //window.location.href = FRONT_BASE_URL + '/login';
          });
      } else {
        console.log('아직도 여기 오류인가' + err.request.status);
        //window.location.href = FRONT_BASE_URL + '/login';
      }
    });
  return groupmanagelist;
};

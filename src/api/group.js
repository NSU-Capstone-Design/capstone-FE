import { baseApi, authenticatedApi, autoRefreshGET } from './axiosApi';
import { refreshAccessToken } from './account';
import { FRONT_BASE_URL } from './account';

export const group_create_api = async (data) => {
  const token = window.localStorage.getItem('access');
  const res = await authenticatedApi(token).post('/groups/grouplist/', {
    group_name: data.group_name,
    introduce: data.introduce,
    group_visible: data.group_visible,
  });
  return res.data;
};

export const getGroupList = async () => {
  let grouplist;
  await authenticatedApi(window.localStorage.getItem('access'))
    .get('/groups/grouplist/')
    .then((gl) => {
      grouplist = gl.data;
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        await authenticatedApi(window.localStorage.getItem('access'))
          .get(`/groups/grouplist/`)
          .then((gl) => {
            grouplist = gl.data;
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
  return grouplist;
};

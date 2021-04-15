import { baseApi, authenticatedApi, autoRefreshGET } from './axiosApi';
export const FRONT_BASE_URL = 'http://127.0.0.1:3000';

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
      console.log(gl, '_ldk');
      grouplist = gl.data;
    })
    .catch((err) => {
      console.log(err);
      grouplist = 'error';
    });
  return grouplist;
};

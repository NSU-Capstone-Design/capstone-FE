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
    .get(`/groups/grouplist/${id}/gmlist/`)
    .then((gml) => {
      groupmanagelist = gml.data;
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        await authenticatedApi(window.localStorage.getItem('access'))
          .get(`/groups/grouplist/${id}/gmlist/`)
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

export const no_expert_groupIn_list = async (data) => {
  const token = window.localStorage.getItem('access');
  let userlist;
  await authenticatedApi(token)
    .post('/users/userList/', {
      group_name: data.group_name,
    })
    .then((ul) => {
      userlist = ul.data;
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        await authenticatedApi(window.localStorage.getItem('access'))
          .post('/users/userList/', {
            group_name: data.group_name,
          })
          .then((ul) => {
            userlist = ul.data;
          })
          .catch((err) => {
            console.log('api.groupDetail-Error: >>>' + err);
          });
      } else {
        console.log('아니면 여기 오류인가' + err.request.status);
      }
    });

  return userlist;
};

export const create_groupmanage_api = async (data, id) => {
  console.log(data);
  console.log(id);
  const token = window.localStorage.getItem('access');
  let res_data;
  await authenticatedApi(token)
    .post(`/groups/grouplist/${id}/gmlist/`, {
      group_id: data.group_name,
      group_master: data.group_master,
      member: data.member,
    })
    .then((res_d) => {
      res_data = res_d;
    })
    .catch(async (err) => {
      if (err.request.status === 401) {
        const accessToken = await refreshAccessToken();
        window.localStorage.setItem('access', accessToken);
        await authenticatedApi(window.localStorage.getItem('access'))
          .post(`/groups/grouplist/${id}/gmlist/`, {
            group_id: data.group_name,
            group_master: data.group_master,
            member: data.member,
          })
          .then((ul) => {})
          .catch((err) => {
            console.log('api.groupDetail-Error: >>>' + err);
          });
      } else {
        console.log('아니면 여기 오류인가' + err.request.status);
      }
    });

  return res_data;
};

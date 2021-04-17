import { baseApi, authenticatedApi } from './axiosApi';
import { refreshAccessToken, FRONT_BASE_URL } from './account';

// 인증이 필요한 요청을 보낼 때
export const getLevelTestProbs = async () => {
  let response;
  await authenticatedApi(window.localStorage.getItem('access'))
    .get('/level/level_test_probs/')
    .then((res) => {
      response = res.data;
    })
    .catch(async (err) => {
      try {
        if (err.response.status == 401) {
          // refresh 토큰으로 access토큰 받기
          const accesToken = await refreshAccessToken();
          window.localStorage.setItem('access', accesToken);
          await authenticatedApi(window.localStorage.getItem('access'))
            .get('/level/level_test_probs/')
            .then((res) => {
              response = res.status;
            })
            .catch(() => {
              window.alert('개발자에게 문의 부탁 드립니다.');
              window.localStorage.removeItem('access');
              window.localStorage.removeItem('refresh');
              window.location.href = FRONT_BASE_URL + '/login';
            });
        }
      } catch (e) {
        alert('현재 서버에서 장애가 있습니다. 잠시후 다시 이용해주세요 ㅜㅜ');
      }
    });
  return response;
};

export const putLevelTestProb = async (grade, id) => {
  let response;
  await authenticatedApi(window.localStorage.getItem('access'))
    .put('/level/level_test_prob/', { grade, id })
    .then((res) => {
      response = res.data;
    })
    .catch(async (err) => {
      try {
        if (err.response.status == 401) {
          // refresh 토큰으로 access토큰 받기
          const accesToken = await refreshAccessToken();
          window.localStorage.setItem('access', accesToken);
          await authenticatedApi(window.localStorage.getItem('access'))
            .put('/level/level_test_prob/', { grade, id })
            .then((res) => {
              response = res.status;
            })
            .catch(() => {
              window.alert('개발자에게 문의 부탁 드립니다.');
              window.localStorage.removeItem('access');
              window.localStorage.removeItem('refresh');
              window.location.href = FRONT_BASE_URL + '/login';
            });
        }
      } catch (e) {
        alert('현재 서버에서 장애가 있습니다. 잠시후 다시 이용해주세요 ㅜㅜ');
      }
    });
  return response;
};

export const createLevel = async () => {
  let response;
  await authenticatedApi(window.localStorage.getItem('access'))
    .put('/level/create_level/')
    .then(() => {})
    .catch(async (err) => {
      try {
        if (err.response.status == 401) {
          // refresh 토큰으로 access토큰 받기
          const accesToken = await refreshAccessToken();
          window.localStorage.setItem('access', accesToken);
          await authenticatedApi(window.localStorage.getItem('access'))
            .put('/level/create_level/')
            .then(() => {})
            .catch(() => {
              window.alert('개발자에게 문의 부탁 드립니다.');
              window.localStorage.removeItem('access');
              window.localStorage.removeItem('refresh');
              window.location.href = FRONT_BASE_URL + '/login';
            });
        }
      } catch (e) {
        alert('현재 서버에서 장애가 있습니다. 잠시후 다시 이용해주세요 ㅜㅜ');
      }
    });
  return response;
};

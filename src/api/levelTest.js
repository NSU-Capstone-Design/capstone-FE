import { baseApi, authenticatedApi } from './axiosApi';

// 인증이 필요한 요청을 보낼 때
export const getLevelTestProbs = async () => {
  let response;
  await authenticatedApi(window.localStorage.getItem('access'))
    .get('/level/level_test_probs/')
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.err(err);
      response = 'error';
    });
  return response;
};

export const putLevelTestProb = async (grade, id) => {
  let response;
  await authenticatedApi(window.localStorage.getItem('access'))
    .put('/level/level_test_prob/', { grade, id })
    .then((res) => {
      console.log(res);
      response = res.data;
    })
    .catch((err) => {
      response = 'error';
    });
  return response;
};

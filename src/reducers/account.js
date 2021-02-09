import login_api from '../api/login';

const LOGIN = 'account/LOGIN';
const SIGN_UP = 'account/SIGN_UP';

export const login = (data) => async (dispatch) => {
  const res = await login_api(data);
  console.log(res);
  return {
    type: LOGIN,
    user_id: res.user_id,
    token: res.token,
  };
};

const initialState = {
  user_id: '',
  token: '',
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        user_id: action.user_id,
        token: action.token,
      };
    default:
      return state;
  }
}

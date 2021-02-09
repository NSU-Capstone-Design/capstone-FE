import { login_api } from '../../api/account';

const LOGIN = 'account/LOGIN';

export const login = (data) => async (dispatch) => {
  const res = await login_api(data);
  dispatch({
    type: LOGIN,
    user_id: res.user_id,
    token: res.token,
  });
};

const initialState = {
  user_id: '',
  token: '',
};

export default function (state = initialState, action) {
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

import { login_api } from '../../api/account';

const LOGIN = 'account/LOGIN';
const WRONG_PW = 'account/WRONG_PW';
const CONFLICT = 'account/CONFLICT';

export const login = (data) => async (dispatch) => {
  login_api(data)
    .then((res) => {
      dispatch({
        type: LOGIN,
        user_id: res.user_id,
        token: res.token,
        status: 'success',
      });
    })
    .catch((err) => {
      const error_code = err.response.status;
      if (error_code == 401) {
        dispatch({
          type: WRONG_PW,
          status: '아이디 또는 비밀번호가 잘못되었습니다.',
        });
      } else if (error_code == 409) {
        dispatch({
          type: CONFLICT,
          status: '알수없는 요청입니다.',
        });
      }
    });
};
export const logout = () => ({
  type: 'LOGOUT',
});
const initialState = {
  user_id: '',
  status: window.localStorage.getItem('token') ? 'success' : '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      window.localStorage.setItem('token', action.token);
      return {
        user_id: action.user_id,
        status: action.status,
      };
    case WRONG_PW:
      return {
        ...state,
        status: action.status,
      };
    case CONFLICT:
      return {
        ...state,
        status: action.status,
      };
    default:
      return initialState;
  }
}

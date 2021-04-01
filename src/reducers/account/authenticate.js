import { login_api } from '../../api/account';

const LOGIN = 'account/LOGIN';
const WRONG_PW = 'account/WRONG_PW';
const CONFLICT = 'account/CONFLICT';
const SUCCESS_TOKEN = 'account/SUCCESS_TOKEN';

export const login = (data) => async (dispatch) => {
  login_api(data)
    .then((res) => {
      dispatch({
        type: LOGIN,
        access: res.access,
        refresh: res.refresh,
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
export const success_check = () => ({
  type: SUCCESS_TOKEN,
});

export const logout = () => ({
  type: 'LOGOUT',
});
const initialState = {
  status: '',
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      window.localStorage.setItem('access', action.access);
      window.localStorage.setItem('refresh', action.refresh);
      return {
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
    case SUCCESS_TOKEN:
      return {
        ...state,
        status: 'success',
      };
    case 'LOGOUT':
      return {
        ...state,
        status: '',
      };
    default:
      return state;
  }
}

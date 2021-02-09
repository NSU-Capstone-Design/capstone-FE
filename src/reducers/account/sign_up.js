import { sign_up_api } from '../../api/account';

const SIGN_UP_SUCCESS = 'account/SIGN_UP_SUCCESS';
const SIGN_UP_ERROR = 'account/SIGN_UP_ERROR';
const SIGN_UP_LOADING = 'account/SIGN_UP_LOADING';

export const sign_up = (data) => async (dispatch) => {
  dispatch({
    type: SIGN_UP_LOADING,
  });
  try {
    const res = await sign_up_api(data);
    console.log(res);
    if (res.code === 0) {
      dispatch({
        type: SIGN_UP_SUCCESS,
        code: res.code,
      });
    } else if (res.code === 1) {
      dispatch({
        type: SIGN_UP_SUCCESS,
        code: res.code,
      });
    } else if (res.code === 2) {
      dispatch({
        type: SIGN_UP_SUCCESS,
        code: res.code,
      });
    } else if (res.code === 3) {
      dispatch({
        type: SIGN_UP_SUCCESS,
        code: res.code,
      });
    }
  } catch (e) {
    dispatch({
      type: SIGN_UP_ERROR,
      code: e,
    });
  }
};

const initialState = {
  loading: false,
  code: -1,
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_LOADING:
      return {
        loading: true,
        code: -1,
        error: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        loading: false,
        code: action.code,
        error: false,
      };
    case SIGN_UP_ERROR:
      return {
        loading: false,
        code: action.code,
        error: true,
      };
    default:
      return state;
  }
}

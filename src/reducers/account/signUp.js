import { sign_up_api } from '../../api/account';

const SIGN_UP_SUCCESS = 'account/SIGN_UP_SUCCESS';
const SIGN_UP_ERROR = 'account/SIGN_UP_ERROR';
const DUPLICATE_ID = 'account/DUPLICATE_ID';
const DUPLICATE_EMAIL = 'account/DUPLICATE_EMAIL';
const SIGN_UP_LOADING = 'account/SIGN_UP_LOADING';
const PROB_EMPTY = 'account/PROB_EMPTY';

export const sign_up = (data) => async (dispatch) => {
  dispatch({
    type: SIGN_UP_LOADING,
  });
  try {
    await sign_up_api(data)
      .then((res) => {
        console.log(res, 'success?');
        dispatch({
          type: SIGN_UP_SUCCESS,
        });
      })
      .catch((err) => {
        const res = err.response.data;
        console.log(res, 'signup api');
        if (res.code === 0) {
          dispatch({
            type: SIGN_UP_ERROR,
          });
        } else if (res.user_id !== undefined) {
          dispatch({
            type: DUPLICATE_ID,
          });
        } else if (res.email !== undefined) {
          dispatch({
            type: DUPLICATE_EMAIL,
          });
        } else if (res.prob_num !== undefined) {
          dispatch({
            type: PROB_EMPTY,
          });
        } else {
          dispatch({
            type: SIGN_UP_ERROR,
          });
        }
      });
  } catch (e) {
    dispatch({
      type: SIGN_UP_ERROR,
    });
  }
};

const initialState = {
  loading: false,
  state: '',
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_LOADING:
      return {
        loading: true,
        state: '',
        error: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        loading: false,
        state: 'success',
        error: false,
      };
    case SIGN_UP_ERROR:
      return {
        loading: false,
        state: '입력형식을 다시한번 확인해주세요!',
        error: true,
      };
    case DUPLICATE_ID:
      return {
        loading: false,
        state: '중복된 아이디입니다.',
        error: true,
      };
    case DUPLICATE_EMAIL:
      return {
        loading: false,
        state: '중복된 이메일입니다.',
        error: true,
      };
    case PROB_EMPTY:
      return {
        loading: false,
        state: '부적절한 접근입니다.잠시 후 이용 바랍니다.',
      };
    default:
      return initialState;
  }
}

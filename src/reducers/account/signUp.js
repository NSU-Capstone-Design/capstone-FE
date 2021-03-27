import { sign_up_api } from '../../api/account';

const SIGN_UP_SUCCESS = 'account/SIGN_UP_SUCCESS';
const SIGN_UP_ERROR = 'account/SIGN_UP_ERROR';
const DUPLICATE_ID = 'account/DUPLICATE_ID';
const DUPLICATE_EMAIL = 'account/DUPLICATE_EMAIL';
const SIGN_UP_LOADING = 'account/SIGN_UP_LOADING';

export const sign_up = (data) => async (dispatch) => {
  dispatch({
    type: SIGN_UP_LOADING,
  });
  try {
    await sign_up_api(data)
      .then((res) => {
        console.log(res);
        dispatch({
          type: SIGN_UP_SUCCESS,
        });
      })
      .catch((err) => {
        const res = err.response.data;
        if (res.code === 0) {
          dispatch({
            type: SIGN_UP_ERROR,
          });
        } else if (res.code === 2) {
          dispatch({
            type: DUPLICATE_ID,
          });
        } else if (res.code === 3) {
          dispatch({
            type: DUPLICATE_EMAIL,
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
    default:
      return initialState;
  }
}

import { getLevelTestProbs } from '../../api/account';

// LTP = Level Test Problems
const GET_LTP = 'account/GET_LTP';
const GET_LTP_SUCCESS = 'account/GET_LTP_SUCCESS';
const GET_LTP_ERROR = 'account/GET_LTP_ERROR';

export const getLTP = () => async (dispatch) => {
  dispatch({ type: GET_LTP });
  try {
    const { probs } = await getLevelTestProbs();
    console.log('levelTestProbs 성공');

    dispatch({
      type: GET_LTP_SUCCESS,
      probs,
    });
  } catch (e) {
    console.log('levelTestProbs 실패', e);
    dispatch({
      type: GET_LTP_ERROR,
    });
  }
};

const initialState = {
  loading: false,
  probs: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LTP:
      return {
        ...state,
        loading: true,
      };
    case GET_LTP_SUCCESS:
      return {
        ...state,
        loading: false,
        probs: action.probs,
      };
    case GET_LTP_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
}

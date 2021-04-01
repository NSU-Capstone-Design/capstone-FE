import { getLevelApi } from '../../api/account';

const GET_LEVEL = 'account/GET_LEVEL';
const GET_LEVEL_SUCCESS = 'account/GET_LEVEL_SUCCESS';
const GET_LEVEL_ERROR = 'account/GET_LEVEL_ERROR';

export const getLevel = () => async (dispatch) => {
  dispatch({ type: GET_LEVEL });
  try {
    // const level = 3;
    const { level } = await getLevelApi();
    console.log(level);
    console.log('level 성공');

    dispatch({
      type: GET_LEVEL_SUCCESS,
      level,
    });
  } catch {
    console.log('level 실패');
    dispatch({
      type: GET_LEVEL_ERROR,
    });
  }
};

const initialState = {
  loading: false,
  level: '',
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEVEL:
      return {
        ...state,
        loading: true,
      };
    case GET_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        level: action.level,
      };
    case GET_LEVEL_ERROR:
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

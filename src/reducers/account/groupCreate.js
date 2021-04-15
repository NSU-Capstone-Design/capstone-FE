import { group_create_api } from '../../api/group';

const GROUP_CREATE_SUCCESS = 'account/GROUP_CREATE_SUCCESS';
const GROUP_CREATE_ERROR = 'account/GROUP_CREATE_ERROR';
const DUPLICATE_TITLE = 'account/DUPLICATE_TITLE';
const GROUP_CREATE_LOADING = 'account/GROUP_CREATE_LOADING';

export const group_create = (data) => async (dispatch) => {
  dispatch({
    type: GROUP_CREATE_LOADING,
  });
  try {
    await group_create_api(data)
      .then((res) => {
        console.log(res);
        dispatch({
          type: GROUP_CREATE_SUCCESS,
        });
      })
      .catch((err) => {
        const res = err.response.data;
        if (res.code === 0) {
          dispatch({
            type: GROUP_CREATE_ERROR,
          });
        } else if (res.code === 2) {
          dispatch({
            type: DUPLICATE_TITLE,
          });
        }
      });
  } catch (e) {
    dispatch({
      type: GROUP_CREATE_ERROR,
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
    case GROUP_CREATE_LOADING:
      return {
        loading: true,
        state: '',
        error: false,
      };
    case GROUP_CREATE_SUCCESS:
      return {
        loading: false,
        state: 'success',
        error: false,
      };
    case GROUP_CREATE_ERROR:
      return {
        loading: false,
        state: '입력형식을 다시한번 확인해주세요!',
        error: true,
      };
    case DUPLICATE_TITLE:
      return {
        loading: false,
        state: '중복된 그룹명입니다.',
        error: true,
      };
    default:
      return initialState;
  }
}

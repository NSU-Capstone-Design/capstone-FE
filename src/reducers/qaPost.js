import { qaDetailApi } from '../api/question';

const GET_QA_POST = 'post/GET_QA_POST';
const GET_QA_POST_SUCCESS = 'post/GET_QA_POST_SUCCESS';
const GET_QA_POST_ERROR = 'post/GET_QA_POST_ERROR';

export const getQAPost = (data) => async (dispatch) => {
  dispatch({ type: GET_QA_POST });
  const result = await qaDetailApi(data);
  console.log('result', result);
  if (result) {
    dispatch({ type: GET_QA_POST_SUCCESS, post: result });
  } else {
    dispatch({ type: GET_QA_POST_ERROR });
  }
};

const initialState = {
  loading: false,
  post: {
    id: 0,
    user_id: '',
    nickname: '',
    subject: '',
    content: '',
    created_at: '',
    updated_at: '',
    post_hit: 0,
    prob_num: 0,
    comments: [
      {
        id: 0,
        replies: [],
        user_id: 0,
        nickname: '',
        object_id: 0,
        content: '',
        created_at: '',
        updated_at: '',
        content_type: 0,
        reply_to: null,
      },
    ],
    answers: [
      {
        id: 0,
        user_id: '',
        nickname: '',
        content: '',
        created_at: '',
        updated_at: '',
        question: 0,
        comments: [],
      },
    ],
  },
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QA_POST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_QA_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.post,
        error: false,
      };
    case GET_QA_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}

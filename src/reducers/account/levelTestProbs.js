import { getLevelTestProbs } from '../../api/levelTest';

// LTP = Level Test Problems
const GET_LTP = 'account/GET_LTP';
const GET_LTP_SUCCESS = 'account/GET_LTP_SUCCESS';
const GET_LTP_ERROR = 'account/GET_LTP_ERROR';

export const getLTP = () => async (dispatch) => {
  dispatch({ type: GET_LTP });
  try {
    const { probs } = await getLevelTestProbs();
    console.log('levelTestProbs 성공');
    const lastProbs = {
      id: 'notice',
      evaluation: '-',
    };

    // evaluation: '',
    // id: '',
    // number: '',
    // problem: {
    //   correct: '',
    //   correct_answer_rate: '',
    //   correct_people: '',
    //   imgurl: '',
    //   ioexam_set: [],
    //   level: 1,
    //   memory_limit: '',
    //   prob_num: '',
    //   problem_content: '',
    //   problem_input: '',
    //   problem_output: '',
    //   submission: '',
    //   timeout: ' ',
    //   title: '',
    // },
    // user: '',
    // weight: '',
    const returnProbs = probs.concat(lastProbs);
    dispatch({
      type: GET_LTP_SUCCESS,
      probs: returnProbs,
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

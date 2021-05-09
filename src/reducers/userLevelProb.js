import { userLevelProblemApi } from '../api/problem';

const GET_USER_LEVEL_PROB = 'problemInfo/GET_USER_LEVEL_PROB';
const GET_USER_LEVEL_PROB_SUCCESS = 'problemInfo/GET_USER_LEVEL_PROB_SUCCESS';
const GET_USER_LEVEL_PROB_ERROR = 'problemInfo/GET_USER_LEVEL_PROB_ERROR';
const USER_LEVEL_PROB_END = 'problemInfo/USER_LEVEL_PROB_END';

export const getUserLevelProb = () => async (dispatch) => {
  dispatch({ type: GET_USER_LEVEL_PROB }); // loading...
  try {
    const problem = await userLevelProblemApi();
    console.log(problem, 'user level problem');
    if (problem.status === 406) {
      dispatch({
        type: USER_LEVEL_PROB_END,
        userLevel: problem.data.user_level,
      });
      return;
    }
    dispatch({
      type: GET_USER_LEVEL_PROB_SUCCESS,
      problem,
    });
  } catch {
    dispatch({
      type: GET_USER_LEVEL_PROB_ERROR,
    });
  }
};

const initialState = {
  loading: false,
  problem: {
    correct: '',
    correct_answer_rate: '',
    correct_people: '',
    ioexam_set: [],
    level: 0,
    memory_limit: '',
    prob_num: 0,
    problem_content: '',
    problem_input: '',
    problem_output: '',
    submission: '',
    timeout: '',
    title: '',
  },
  error: false,
  next: false,
  level: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_LEVEL_PROB:
      return {
        ...state,
        loading: true,
        next: false,
      };
    case GET_USER_LEVEL_PROB_SUCCESS:
      return {
        ...state,
        next: false,
        loading: false,
        problem: action.problem,
      };
    case GET_USER_LEVEL_PROB_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        next: false,
      };
    case USER_LEVEL_PROB_END:
      return {
        ...state,
        loading: false,
        error: false,
        next: true,
        level: action.userLevel,
      };
    default:
      return state;
  }
}

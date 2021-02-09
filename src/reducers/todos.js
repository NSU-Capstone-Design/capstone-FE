const ADD_TODO = 'todolist/ADD_TODO';
const TOGGLE_TODO = 'todolist/TOGGLE_TODO';

let todoId = 0;
export const addTodo = (text) => ({
  type: ADD_TODO,
  todo: {
    id: todoId + 1,
    text,
    toggle: false,
  },
});

export const toggleTodo = (id) => ({
  type: ADD_TODO,
  id,
});

const initialState = [
  {
    id: 1,
    text: '기본값',
    toggle: false,
  },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? (todo.toggle = !todo.toggle) : todo
      );
    default:
      return state;
  }
}

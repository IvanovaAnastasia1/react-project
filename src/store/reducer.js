const defaultState = {
  todos: [],
  category: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_TODO':
      console.log('get todo', action);

      return { ...state, todos: action.payload };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };
    case 'GET_CATEGORY':
      console.log('GET_CATEGORY', action);

      return { ...state, category: action.payload };
    case 'ADD_CATEGORY':
      return {
        ...state,
        category: [...state.category, ...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;

import {
  SET_TODOS_FETCH,
  SET_TODOS,
  ADD_TODOS_ITEM,
  UPDATE_TODOS_ITEM,
  DELETE_TODOS_ITEM,
} from './action';

const initialState = {
  fetch: false,
  items: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_TODOS_FETCH: {
      return Object.assign({}, state, {
        fetch: payload.fetch,
      });
    }

    case SET_TODOS: {
      const { todos } = payload;

      return Object.assign({}, state, {
        items: todos,
      });
    }

    case ADD_TODOS_ITEM: {
      const { todo } = payload;

      return Object.assign({}, state, {
        items: [...state.items, todo],
      });
    }

    case UPDATE_TODOS_ITEM: {
      const { todo } = payload;

      return Object.assign({}, state, {
        items: state.items.map(i => i.id === todo.id ? todo : i),
      });
    }

    case DELETE_TODOS_ITEM: {
      const { todo } = payload;

      return Object.assign({}, state, {
        items: state.items.filter(i => i.id !== todo.id),
      });
    }

    default: {
      return state;
    }
  }
}

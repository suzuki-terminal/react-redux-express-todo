import { createAction } from 'redux-actions';
import shortid from 'shortid';

export const SET_TODOS_FETCH = shortid.generate();
export const setTodosFetch = createAction(SET_TODOS_FETCH);

export const SET_TODOS = shortid.generate();
export const setTodos = createAction(SET_TODOS);

export const ADD_TODOS_ITEM = shortid.generate();
export const addTodosItem = createAction(ADD_TODOS_ITEM);

export const UPDATE_TODOS_ITEM = shortid.generate();
export const updateTodosItem = createAction(UPDATE_TODOS_ITEM);

export const DELETE_TODOS_ITEM = shortid.generate();
export const deleteTodosItem = createAction(DELETE_TODOS_ITEM);

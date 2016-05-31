import {makeSyncLoop, isNotSync} from '../utils/itemSyncUtils';
import constFactory from '../factories/const.factory';

export const types = constFactory('todo');

const syncTodos = (options) => {
	return (dispatch, getState) => {

		return dispatch(loadTodos(options))
			.then(() => {
				const itemsToSync = getState().todos.items.filter(isNotSync);
				return Promise.all(itemsToSync.map(item => dispatch(saveTodo(item))));
			});
	}
};
export const startSyncLoop = makeSyncLoop(syncTodos);

export const loadTodos = options => {
	return {
		url: 'todos',
		method: 'get',
		meta: {
			...options
		},
		types: {
			start: types.LOAD_START,
			success: types.LOAD_SUCCESS,
			noConnection: types.LOAD_NO_CONNECTION,
			error: types.LOAD_ERROR
		}
	};
};

export const saveTodo = todo =>
	!todo.id || todo._isNew ?
		createTodo(todo) :
		updateTodo(todo);

export const updateTodo = todo => {
	return {
		url: `todos/${todo.id}`,
		method: 'put',
		body: todo,
		types: {
			start: types.UPDATE_START,
			success: types.UPDATE_SUCCESS,
			noConnection: types.UPDATE_NO_CONNECTION,
			error: types.UPDATE_ERROR
		}
	}
};

export const createTodo = todo => {
	const id = todo.id || Date.now().toString();
	return {
		url: 'todos',
		method: 'post',
		body: {
			...todo,
			_isNew: true,
			id
		},
		meta: {
			id
		},
		types: {
			start: types.CREATE_START,
			success: types.CREATE_SUCCESS,
			noConnection: types.CREATE_NO_CONNECTION,
			error: types.CREATE_ERROR
		}
	};
};

export const deleteTodo = id => (dispatch, getState) => {
	const todo = getState().todos.items.find(item => item.id === id);

	return dispatch(todo._isNew ?
		deleteNewTodo(todo.id) :
		deleteExistingTodo(todo)
	);
};

const deleteNewTodo = id => {
	return {
		type: types.DELETE_NEW,
		payload: {id}
	}
};

const deleteExistingTodo = todo => {
	return {
		url: `todos/${todo.id}`,
		method: 'put',
		body: {
			...todo,
			_isDeleted: true
		},
		types: {
			start: types.DELETE_START,
			success: types.DELETE_SUCCESS,
			noConnection: types.DELETE_NO_CONNECTION,
			error: types.DELETE_ERROR
		}
	};
};
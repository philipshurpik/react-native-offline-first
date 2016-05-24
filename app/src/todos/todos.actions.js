import {makeSyncLoop, isNotSync} from '../utils/itemSyncUtils';

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

export const LOAD_TODOS_START = 'LOAD_TODOS_START';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_NO_CONNECTION = 'LOAD_TODOS_NO_CONNECTION';
export const loadTodos = options => {
	return {
		url: 'todos',
		method: 'get',
		meta: {
			...options
		},
		types: {
			start: LOAD_TODOS_START,
			success: LOAD_TODOS_SUCCESS,
			noConnection: LOAD_TODOS_NO_CONNECTION
		}
	};
};

export const saveTodo = todo =>
	!todo.id || todo._isNew ?
		createTodo(todo) :
		updateTodo(todo);

export const UPDATE_TODO_START = 'UPDATE_TODO_START';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_NO_CONNECTION = 'UPDATE_TODO_NO_CONNECTION';
export const UPDATE_TODO_ERROR = 'UPDATE_TODO_ERROR';
export const updateTodo = todo => {
	return {
		url: `todos/${todo.id}`,
		method: 'put',
		body: todo,
		types: {
			start: UPDATE_TODO_START,
			success: UPDATE_TODO_SUCCESS,
			noConnection: UPDATE_TODO_NO_CONNECTION,
			error: UPDATE_TODO_ERROR
		}
	}
};

export const CREATE_TODO_START = 'CREATE_TODO_START';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_NO_CONNECTION = 'CREATE_TODO_NO_CONNECTION';
export const CREATE_TODO_ERROR = 'CREATE_TODO_ERROR';
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
			start: CREATE_TODO_START,
			success: CREATE_TODO_SUCCESS,
			noConnection: CREATE_TODO_NO_CONNECTION,
			error: CREATE_TODO_ERROR
		}
	};
};

export const DELETE_TODO_START = 'DELETE_TODO_START';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_NO_CONNECTION = 'DELETE_TODO_NO_CONNECTION';
export const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR';
export const DELETE_NEW_TODO = 'DELETE_NEW_TODO';
export const deleteTodo = id => (dispatch, getState) => {
	const todo = getState().todos.items.find(item => item.id === id);

	return dispatch(todo._isNew ?
		deleteNewTodo(todo.id) :
		deleteExistingTodo(todo)
	);
};

const deleteNewTodo = id => {
	return {
		type: DELETE_NEW_TODO,
		payload: {id}
	}
};

const deleteExistingTodo = todo => {
	return {
		url: `todos/${todo.id}`,
		method: 'put',
		body: {
			...todo,
			isArchived: true
		},
		types: {
			start: DELETE_TODO_START,
			success: DELETE_TODO_SUCCESS,
			noConnection: DELETE_TODO_NO_CONNECTION,
			error: DELETE_TODO_ERROR
		}
	};
};
const randomString = () => Math.floor(Math.random() * Math.pow(10, 16)).toString(36);

export const LOAD_TODOS_START = 'LOAD_TODOS_START';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_NO_CONNECTION = 'LOAD_TODOS_NO_CONNECTION';

export const syncTodos = () => {
	return (dispatch, getState) => {
		const itemsToSync = getState().todos.items.filter(item => item._notSynced);
		if (!itemsToSync.length) {
			return dispatch(loadTodos());
		}
		return Promise.all(itemsToSync.map(item => dispatch(saveTodo(item))))
			.then(() => dispatch(loadTodos()));
	}
};


const loadTodos = () => {
	return {
		url: 'todos',
		method: 'get',
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
export const updateTodo = todo => {
	return {
		url: `todos/${todo.id}`,
		method: 'put',
		body: todo,
		meta: {
			originalTodo: originalTodo
		},
		types: {
			start: UPDATE_TODO_START,
			success: UPDATE_TODO_SUCCESS,
			noConnection: UPDATE_TODO_NO_CONNECTION
		}
	}
};

export const CREATE_TODO_START = 'CREATE_TODO_START';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_NO_CONNECTION = 'CREATE_TODO_NO_CONNECTION';
export const createTodo = todo => {
	return {
		url: 'todos',
		method: 'post',
		body: {
			...todo,
			id: randomString()
		},
		meta: {
			id: todo.id || randomString()
		},
		types: {
			start: CREATE_TODO_START,
			success: CREATE_TODO_SUCCESS,
			noConnection: CREATE_TODO_NO_CONNECTION
		}
	};
};
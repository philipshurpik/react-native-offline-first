import * as types from './todos.actions';
import networkStatus from '../common/networkStatus.reducer';
import replaceById from '../common/replaceById';

const INITIAL_STATE = {
	items: [],
	status: networkStatus()
};

export default function todos(state = INITIAL_STATE, action) {
	switch (action.type) {
		/** LOAD **/

		case types.LOAD_TODOS_START:
			return {
				...state
			};
		case types.LOAD_TODOS_SUCCESS:
			return {
				...state,
				status: networkStatus(state.status, action),
				items: action.payload.filter(item => !item.isArchived)
			};

		/** UPDATE **/

		case types.UPDATE_TODO_START:
			return {
				...state,
				items: replaceById(state.items, {
					...action.payload,
					_notSynced: true
				})
			};
		case types.UPDATE_TODO_SUCCESS:
			return {
				...state,
				items: replaceById(state.items, action.payload)
			};

		/** CREATE **/

		case types.CREATE_TODO_START:
			return {
				...state,
				items: replaceById(state.items, {
					...action.payload,
					id: action.meta.id,
					_isNew: true,
					_notSynced: true
				}, action.meta.id)
			};
		case types.CREATE_TODO_SUCCESS:
			return {
				...state,
				items: replaceById(state.items, action.payload, action.meta.id)
			};

		/** ANY - NO_CONNECTION **/

		case types.LOAD_TODOS_NO_CONNECTION:
		case types.CREATE_TODO_NO_CONNECTION:
		case types.UPDATE_TODO_NO_CONNECTION:
			return {
				...state,
				status: networkStatus(state.status, action)
			};

		default:
			return state;
	}
}

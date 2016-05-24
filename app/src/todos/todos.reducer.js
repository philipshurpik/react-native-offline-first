import * as types from './todos.actions';
import networkStatus from '../common/networkStatus.reducer';
import {setSyncStatus, mergeItems} from '../utils/itemSyncUtils';
import {addOrReplaceItem, replaceById, removeById, itemComparator} from '../utils/itemUtils';

const INITIAL_STATE = {
	items: [],
	status: networkStatus(),
	persistVersion: 1
};

export default function todos(state = INITIAL_STATE, action) {
	if (state.persistVersion !== INITIAL_STATE.persistVersion) {
		return todos(INITIAL_STATE, action);
	}

	switch (action.type) {
		/** LIST LOAD **/
		case types.LOAD_TODOS_START:
		case types.LOAD_TODOS_NO_CONNECTION:
			return {
				...state,
				status: networkStatus(state.status, action)
			};
		case types.LOAD_TODOS_SUCCESS:
			return {
				...state,
				status: networkStatus(state.status, action),
				items: mergeItems(state.items, action.payload).sort(itemComparator)
			};

		/** ITEM START **/
		case types.CREATE_TODO_START:
			return {
				...state,
				items: addOrReplaceItem(state.items, {...action.payload, _status: setSyncStatus(action)})
			};

		/** ITEM SET ITEM & STATUSES: START & NO_CONNECTION & ERROR **/
		case types.UPDATE_TODO_START:
		case types.DELETE_TODO_START:
		case types.CREATE_TODO_NO_CONNECTION:
		case types.UPDATE_TODO_NO_CONNECTION:
		case types.DELETE_TODO_NO_CONNECTION:
		case types.CREATE_TODO_ERROR:
		case types.UPDATE_TODO_ERROR:
			return {
				...state,
				items: replaceById(state.items, {...action.payload, _status: setSyncStatus(action)})
			};

		/** ITEM SUCCESS **/
		case types.CREATE_TODO_SUCCESS:
			return {
				...state,
				items: replaceById(state.items, action.payload, action.meta.id)
			};
		case types.UPDATE_TODO_SUCCESS:
		case types.DELETE_TODO_SUCCESS:
			return {
				...state,
				items: replaceById(state.items, action.payload)
			};

		/** ITEM DELETE ERROR **/
		case types.DELETE_TODO_ERROR:
			return {
				...state,
				items: replaceById(state.items, {
					...action.payload,
					isArchived: false,
					_status: setSyncStatus(action)
				})
			};

		/** NOT SYNCED ITEM DELETE **/
		case types.DELETE_NEW_TODO:
			return {
				...state,
				items: removeById(state.items, action.payload.id)
			};

		default:
			return state;
	}
}

import networkStatus from '../common/networkStatus.reducer';
import {types} from './todos.actions';
import itemsReducerFactory from '../factories/itemsReducer.factory';
const items = itemsReducerFactory(types);

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
		case types.LOAD_START:
		case types.LOAD_NO_CONNECTION:
			return {
				...state,
				status: networkStatus(state.status, action)
			};
		case types.LOAD_SUCCESS:
			return {
				...state,
				status: networkStatus(state.status, action),
				items: items(state.items, action)
			};
		
		case types.CREATE_START:
		case types.UPDATE_START:
		case types.DELETE_START:
		case types.CREATE_NO_CONNECTION:
		case types.UPDATE_NO_CONNECTION:
		case types.DELETE_NO_CONNECTION:
		case types.CREATE_ERROR:
		case types.UPDATE_ERROR:
		case types.CREATE_SUCCESS:
		case types.UPDATE_SUCCESS:
		case types.DELETE_SUCCESS:
		case types.DELETE_ERROR:
		case types.DELETE_NEW:
			return {
				...state,
				items: items(state.items, action)
			};

		default:
			return state;
	}
}

const INITIAL_NETWORK_STATUS = {
	refreshing: false,
	offline: false
};

export default function statusReducerFactory(types) {
	
	return function statusReducer(state = INITIAL_NETWORK_STATUS, action) {
		switch (action.type) {
			case types.LOAD_START:
				return {
					...state,
					refreshing: true,
					silent: action.meta ? action.meta.silent : false
				};
			case types.LOAD_SUCCESS:
				return {
					...state,
					refreshing: false,
					offline: false,
					error: null
				};
			case types.LOAD_NO_CONNECTION:
			case types.CREATE_NO_CONNECTION:
			case types.UPDATE_NO_CONNECTION:
			case types.DELETE_NO_CONNECTION:
				return {
					...state,
					refreshing: false,
					offline: true
				};
			case types.LOAD_ERROR:
			case types.CREATE_ERROR:
			case types.UPDATE_ERROR:
			case types.DELETE_ERROR:
				return {
					...state,
					refreshing: false,
					offline: false,
					// TODO: add error message handling
					error: action.error
				};
			case types.CREATE_SUCCESS:
			case types.UPDATE_SUCCESS:
			case types.DELETE_SUCCESS:
				return {
					...state,
					error: null
				};
			default:
				return state;
		}
	}
}

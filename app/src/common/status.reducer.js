import {REHYDRATE} from 'redux-persist/constants'

export default function status(state = {route: {}}, action) {
	switch (action.type) {
		case REHYDRATE:
			return {
				...state,
				storageLoaded: true
			};
		default:
			return state;
	}
}

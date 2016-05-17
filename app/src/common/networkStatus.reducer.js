const INITIAL_NETWORK_STATUS = {
	refreshing: false,
	offline: false
};

export default function networkStatus(state = INITIAL_NETWORK_STATUS, action = {}) {
	if (/START$/.test(action.type)) {
		state = {
			...state,
			refreshing: true
		};
	}
	if (/SUCCESS/.test(action.type)) {
		state = {
			...state,
			refreshing: false,
			offline: false
		};
	}
	if (/NO_CONNECTION/.test(action.type)) {
		state = {
			...state,
			refreshing: false,
			offline: true
		};
	}
	return state
}

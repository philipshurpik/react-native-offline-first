export const SYNC_STATUS = {
	START: "START",
	NO_CONNECTION: "NO_CONNECTION",
	ERROR: "ERROR"
};

export const isNotSync = item => (item._status === SYNC_STATUS.START || item._status === SYNC_STATUS.NO_CONNECTION || item._status === SYNC_STATUS.ERROR);
export const isNoConnection = item => (item._status === SYNC_STATUS.NO_CONNECTION);
export const isError = item => (item._status === SYNC_STATUS.ERROR);

export const setSyncStatus = (action) => {
	if (/START$/.test(action.type)) {
		if (isNotSync(action.payload)) {
			return action.payload._status;
		}
		return SYNC_STATUS.START;
	}
	if (/NO_CONNECTION$/.test(action.type)) {
		return SYNC_STATUS.NO_CONNECTION;
	}
	if (/ERROR$/.test(action.type)) {
		return SYNC_STATUS.ERROR;
	}
};

export const makeSyncLoop = syncAction => {
	let timer = null;

	return function syncLoop(options) {
		return dispatch => {
			if (timer) {
				clearTimeout(timer);
			}
			function next() {
				timer = setTimeout(() => {
					timer = null;
					dispatch(syncLoop({...options, silent: true}));
				}, 1000 * 20);
			}

			return dispatch(syncAction(options)).then(next, next);
		}
	};
};

export const mergeItems = (prev, next) => {
	const notSync = prev.filter(isNotSync);
	const notSyncIds = notSync.map(item => item.id);
	return next
		.filter(item => notSyncIds.indexOf(item.id) === -1)
		.concat(notSync);
};

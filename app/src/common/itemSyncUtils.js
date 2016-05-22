const SYNC_STATUS = {
	START: "START",
	NO_CONNECTION: "NO_CONNECTION",
	ERROR: "ERROR"
};

export const isNotSync = item => (item._status === SYNC_STATUS.START || item._status === SYNC_STATUS.NO_CONNECTION || item._status === SYNC_STATUS.ERROR);
export const isNoConnection = item => (item._status === SYNC_STATUS.NO_CONNECTION);
export const isError = item => (item._status === SYNC_STATUS.ERROR);

export const setSyncStatus = (action) => {
	if (/START$/.test(action.type)) {
		return SYNC_STATUS.START;
	}
	if (/NO_CONNECTION$/.test(action.type)) {
		return SYNC_STATUS.NO_CONNECTION;
	}
	if (/ERROR$/.test(action.type)) {
		return SYNC_STATUS.ERROR;
	}
};

export const makeSyncLoop = (syncAction) => dispatch => {
	if (makeSyncLoop.timer) {
		return;
	}
	function next() {
		makeSyncLoop.timer = setTimeout(() => {
			dispatch(makeSyncLoop())
		}, 1000 * 60);
	}
	return dispatch(syncAction()).then(next, next);
};
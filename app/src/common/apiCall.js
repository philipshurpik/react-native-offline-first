const HOST = 'http://localhost:1906/';

export const apiCallMiddleware = ({dispatch, getState}) => {
	return next => action =>
		typeof action === 'object' && action.url && !action.type ?
			apiCall({...action, dispatch, getState}) :
			next(action);
};

export const apiCall = ({dispatch, url, method = 'get', types, body, meta}) => {
	if (body) {
		delete body._isNew;
		delete body._notSynced;
	}

	const opts = {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: body && JSON.stringify(body)
	};

	function onError(error) {
		error = (error instanceof HttpError) ? error : new NetworkError(error, url);

		if ((error instanceof NetworkError) || error.status >= 500) {
			return onNoConnection(error);
		}
		console.log(url, error);

		if (types && types.error) {
			dispatch({type: types.error, payload: body, meta, url, error});
		}
		return Promise.reject(error);
	}

	function onNoConnection(error) {
		if (types && (types.noConnection)) {
			dispatch({type: types.noConnection, payload: body, meta, url, error});
		}
		return Promise.reject(error);
	}

	function onSuccess(data) {
		if (types && types.success) {
			dispatch({type: types.success, payload: data, meta});
		}
		return data;
	}

	if (types && types.start) {
		dispatch({type: types.start, payload: body, meta});
	}

	return fetch(HOST + url, opts)
		.then(res => {
			if (!res.ok) {
				return res.json()
					.catch(e => ({}))
					.then(data => {
						throw new HttpError(data, res)
					});
			}
			return res.json();
		})
		.then(onSuccess)
		.catch(onError);
};

function HttpError(error, res) {
	Object.assign(this, error);
	this.status = res.status;
	this.statusText = res.statusText;
	this.url = res.url;
	this.stack = new Error().stack.split('\n').slice(1).join('\n');
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.toString = function () {
	return `${this.status} ${this.url} ${this.message}`;
};

function NetworkError(error, url) {
	this.message = error.message;
	this.stack = error.stack.replace('TypeError', 'NetworkError');
	this.url = url;
}
NetworkError.prototype = Object.create(Error.prototype);
NetworkError.prototype.toString = function () {
	return `${this.message} ${this.url}`;
};

// TODO: Temp solution for not authentificated user (onboarding)
console.ignoredYellowBox = [
	'Possible Unhandled Promise Rejection'
].concat(console.ignoredYellowBox);

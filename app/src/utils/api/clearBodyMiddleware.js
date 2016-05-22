export const clearBodyMiddleware = () => {
	return next => action =>
		(typeof action === 'object' && action.url && action.body && !action.type) ?
			next(clearBody(action)) :
			next(action);
};

const clearBody = (action) => {
	return {
		...action,
		originalBody: {...action.body},
		body: Object.keys(action.body).reduce((data, key) => {
			if (!key.startsWith('_')) {
				data[key] = action.body[key]
			}
			return data;
		}, {})
	}
};



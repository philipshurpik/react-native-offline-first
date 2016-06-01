import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../src/rootReducer';
import {apiCallMiddleware} from '../../src/utils/api/apiCallMiddleware';
import {clearBodyMiddleware} from '../../src/utils/api/clearBodyMiddleware';

export function createTestStore() {
	let store = createStore(rootReducer, applyMiddleware(clearBodyMiddleware, apiCallMiddleware, thunk));
	store.getState().auth.token = 'fake token';
	store.getState().env.apiHost = '';
	return store;
}

export function mockFetchResolve(opts) {
	let originalFetch;
	before(() => {
		originalFetch = global.fetch;
		global.fetch = makeFetchResolve(opts)
	});

	after(() => {
		global.fetch = originalFetch;
	});
}

function makeFetchResolve(opts) {
	return (url, req) => {
		return Promise.resolve({
			ok: true,
			json: () => new Promise(resolve => {
				let data = opts;
				if (opts instanceof Array && opts.length && opts[0].method && opts[0].data) {
					data = opts.reduce((current, option) => req.method === option.method ? option.data : current, opts);
				}
				return resolve(data);
			})
		});
	}
}

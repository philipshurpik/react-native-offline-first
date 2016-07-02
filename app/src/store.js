import { persistStore, autoRehydrate } from 'redux-persist'
import {applyMiddleware, createStore, compose} from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import devTools from 'remote-redux-devtools';
import {apiCallMiddleware} from './utils/api/apiCallMiddleware';
import {clearBodyMiddleware} from './utils/api/clearBodyMiddleware';
import rootReducer from './rootReducer';

const logger = createLogger();
const store = createStore(rootReducer, compose(
	applyMiddleware(clearBodyMiddleware, apiCallMiddleware, thunk, logger),
	autoRehydrate(),
	devTools({hostname: 'localhost', port: 5678})
));

persistStore(store, {storage: AsyncStorage});

export default store;
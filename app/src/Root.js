import React from 'react';
import {Component, View, Text} from 'react-native'
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

const Root = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default Root;
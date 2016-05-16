import React, {Component, View, Text} from 'react-native'
import { Provider } from 'react-redux';

import store from './store';
import TodosPage from './todos/TodosPage';

const Root = () => (
    <Provider store={store}>
        <TodosPage />
    </Provider>
);

export default Root;
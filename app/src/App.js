import React from 'react';
import {Component, View} from 'react-native'
import {connect} from 'react-redux';
import TodosPage from './todos/TodosPage';

const App = (props) => {
	return props.status.storageLoaded ? <TodosPage /> : <View/>
};

export default connect(state => state)(App);
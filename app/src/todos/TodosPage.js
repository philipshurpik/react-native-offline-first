import {connect} from 'react-redux';
import React from 'react';
import {Component, View, StyleSheet, Text} from 'react-native';
import List from '../common/List';
import TodoItem from './components/TodoItem';
import {loadTodos} from './todos.actions.js';

class TodosPage extends Component {
	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(loadTodos());
	}

	render() {
		const {todos, dispatch, status} = this.props;
		return (
			<View style={styles.pageContainer}>
				<View style={styles.header}>
					<Text>Todos</Text>
				</View>
				{status.storageLoaded && <List
					items={todos.items}
					status={todos.status}
					renderItem={item => <TodoItem {...item}/>}
					placeholder="You don't have any active todo :)"
					onRefresh={() => dispatch(loadTodos())}
				/>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 20
	},
	header: {
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'lightgray',
		borderBottomWidth: 1
	}
});

export default connect(state => state)(TodosPage);

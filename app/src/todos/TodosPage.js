import {connect} from 'react-redux';
import React from 'react';
import {Component, View, StyleSheet} from 'react-native';
import List from '../common/List';
import TodoItem from './components/TodoItem';
import {loadTodos} from './todos.actions.js';

class TodosPage extends Component {
	componentWillMount() {
		const {dispatch} = this.props;
		dispatch(loadTodos());
	}

	render() {
		const {todos, dispatch} = this.props;
		return (
			<View style={styles.pageContainer}>
				<View style={styles.header}>
					<Text>Todos</Text>
				</View>
				<List
					items={todos.items}
					status={todos.status}
					renderItem={item => <TodoItem {...item}/>}
					placeholder="You don't have any todo yet"
					onRefresh={() => dispatch(loadTodos())}
				/>
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
		height: 44
	}
});

export default connect(state => state)(TodosPage);

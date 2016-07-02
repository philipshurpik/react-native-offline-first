import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, StyleSheet, Text, NetInfo} from 'react-native';
import List from '../common/List';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import {syncTodos, saveTodo, deleteTodo} from './todos.actions.js';
import {getActiveTodos} from './todos.reducer';

class TodosPage extends Component {
	componentWillMount() {
		NetInfo.addEventListener('change', (reach) =>
			reach !== 'none' && this.props.onRefresh({silent: true})
		);
	}

	render() {
		const {items, status, onRefresh, onDelete} = this.props;

		return (
			<View style={styles.pageContainer}>
				<View style={styles.header}>
					<Text>Todos</Text>
				</View>
				<AddTodo onCreate={this.onCreate.bind(this)}/>
				<List
					items={items}
					status={status}
					renderItem={item => <TodoItem onDelete={onDelete} {...item}/>}
					onItemSelect={this.onToggle.bind(this)}
					placeholder="You don't have any active todo :)"
					onRefresh={onRefresh}
				/>
			</View>
		);
	}

	onCreate(value) {
		this.props.saveTodo({value, completed: false});
	}

	onToggle(item) {
		this.props.saveTodo({...item, completed: !item.completed});
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

const mapStateToProps = state => ({
	items: getActiveTodos(state),
	status: state.todos.status
});

export default connect(mapStateToProps, {
	onRefresh: syncTodos,
	onDelete: deleteTodo,
	saveTodo: saveTodo
})(TodosPage);
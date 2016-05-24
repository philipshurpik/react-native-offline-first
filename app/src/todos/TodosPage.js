import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import List from '../common/List';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import {startSyncLoop, saveTodo} from './todos.actions.js';

class TodosPage extends Component {
	componentWillMount() {
		this.props.dispatch(startSyncLoop({silent: true}));
	}

	render() {
		const {todos, dispatch, status} = this.props;
		return (
			<View style={styles.pageContainer}>
				<View style={styles.header}>
					<Text>Todos</Text>
				</View>
				<AddTodo onCreate={this.onCreate.bind(this)}/>
				{status.storageLoaded && <List
					items={todos.items}
					status={todos.status}
					renderItem={item => <TodoItem {...item}/>}
					placeholder="You don't have any active todo :)"
					onRefresh={() => dispatch(startSyncLoop())}
				/>}
			</View>
		);
	}

	onCreate(value) {
		this.props.dispatch(saveTodo({value}));
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

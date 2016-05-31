import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {isNoConnection, isError} from '../../utils/itemSyncUtils';

export default todo => (
	<View style={[
		isNoConnection(todo) && styles.noConnection,
		isError(todo) && styles.error,
		styles.row
	]}>
		<Text style={[styles.name, todo.completed && styles.completed]}>
			{todo.value}
		</Text>
		<TouchableOpacity onPress={() => todo.onDelete(todo.id)} style={styles.deleteButton}>
			<Text style={styles.deleteText}>
				x
			</Text>
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	noConnection: {
		borderLeftColor: 'orange',
		borderLeftWidth: 2
	},
	error: {
		borderLeftColor: 'red',
		borderLeftWidth: 2
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
		marginBottom: 5
	},
	name: {
		color: 'black'
	},
	completed: {
		textDecorationLine: 'line-through'
	},
	deleteButton: {
		position: 'absolute',
		top: -10,
		right: 0,
		width: 50,
		height: 50
	},
	deleteText: {
		color: 'darkorange',
		fontSize: 20,
		paddingRight: 10,
		paddingLeft: 25,
		paddingTop: 6
	}
});


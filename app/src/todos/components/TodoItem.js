import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {isNoConnection, isError} from '../../common/itemSyncUtils';

export default todo => (
	<TouchableOpacity
		style={[isNoConnection(todo) && styles.noConnection, isError(todo) && styles.error]}
		onPress={todo.onPress}
	>
		<View style={styles.row}>
			<Text style={styles.name}>{todo.value}</Text>
		</View>
	</TouchableOpacity>
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
		color: 'gray'
	}
});


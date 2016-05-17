import React, {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

export default todo => (
	<TouchableOpacity style={todo._notSynced && styles.notSynced} onPress={todo.onPress}>
		<View style={styles.row}>
			<Text style={styles.name}>{todo.value}</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	notSynced: {
		borderLeftColor: 'yellow',
		borderLeftWidth: 2
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
		marginBottom: 5
	},
	name: {
		color: 'darkGray'
	}
});


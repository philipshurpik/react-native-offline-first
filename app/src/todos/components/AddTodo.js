import React from 'react';
import {TouchableOpacity, TextInput, View, Text, StyleSheet} from 'react-native';

export default class AddTodo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ""
		}
	}

	render() {
		return <View style={styles.container}>
			<TextInput
				ref="input"
				style={styles.input}
				autoCorrect={false}
				autoCapitalize="none"
				placeholderTextColor='#a8aAeC'
				placeholder="New Todo"
				value={this.state.value}
			    onChangeText={value => this.setState({value})}
			/>
			<TouchableOpacity style={styles.button} onPress={this.onPress.bind(this)}>
				<Text style={styles.buttonText}>Create</Text>
			</TouchableOpacity>
		</View>
	}

	onPress() {
		if (this.state.value.length) {
			this.props.onCreate(this.state.value);
			this.setState({value: ""});
		}
	}
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: 'lightgray'
	},
	input: {
		flex: 4,
		paddingHorizontal: 20
	},
	button: {
		flex: 1,
		borderWidth: 1,
		borderColor: 'orange',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5
	}
});


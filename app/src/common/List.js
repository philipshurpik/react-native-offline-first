import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ListView, RefreshControl, TouchableOpacity} from 'react-native';

export default class List extends Component {
	constructor(props) {
		super();
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			ds: this.ds.cloneWithRows(props.items)
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			ds: this.ds.cloneWithRows(props.items)
		});
	}

	render() {
		const {style, onRefresh, status, items, placeholder} = this.props;

		return <View style={[styles.list]}>
			{!items.length && placeholder && <View style={styles.placeholder}>
				<Text style={styles.placeholderText}>{placeholder}</Text>
			</View>}
			<ListView
				style={[styles.list, style]}
				enableEmptySections={true}
				dataSource={this.state.ds}
				renderRow={this.renderRow.bind(this)}
				renderHeader={this.renderHeader.bind(this)}
				refreshControl={status ? <RefreshControl
					refreshing={status.silent ? false : status.refreshing}
					onRefresh={onRefresh}
				/> : undefined
				}
			/>
		</View>;
	}

	renderRow(item) {
		const {renderItem, onItemSelect} = this.props;
		return <TouchableOpacity
			style={[styles.row]}
			onPress={() => onItemSelect && onItemSelect(item)}>
			{renderItem(item)}
		</TouchableOpacity>
	}

	renderHeader() {
		const {offline} = this.props.status || {};
		return offline ? <View style={styles.offline}><Text>Offline</Text></View> : <View/>;
	}
}

List.propTypes = {
	style: PropTypes.number,
	renderItem: PropTypes.func.isRequired,
	onRefresh: PropTypes.func,
	onItemSelect: PropTypes.func,
	items: PropTypes.array,
	status: PropTypes.shape({
		refreshing: React.PropTypes.bool.isRequired,
		offline: React.PropTypes.bool
	})
};

const styles = StyleSheet.create({
	list: {
		flex: 1
	},
	row: {
		padding: 10,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderColor: '#f3f3f3'
	},
	placeholder: {
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	placeholderText: {
		fontSize: 20,
		color: 'gray'
	},
	offline: {
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'orange'
	}
});

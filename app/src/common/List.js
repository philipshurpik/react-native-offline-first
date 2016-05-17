import React, {Component, StyleSheet, View, Text, ListView, RefreshControl, PropTypes, TouchableOpacity} from 'react-native';

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
		if (!items.length) {
			if (status && status.refreshing) {
				return <View style={style}>
					<Text>Loading...</Text>
				</View>;
			}
			if (placeholder) {
				return <View style={[styles.placeholder, style]}>
					<Text style={styles.placeholderText}>{placeholder}</Text>
				</View>
			}
		}
		return <ListView
			style={style}
			enableEmptySections={true}
			dataSource={this.state.ds}
			renderRow={this.renderRow.bind(this)}
			renderHeader={this.renderHeader.bind(this)}
			refreshControl={status ? <RefreshControl
				refreshing={status.refreshing}
				onRefresh={onRefresh}
				tintColor='lightGray'
			/> : undefined}
		/>;
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
		return offline ? <Text>Offline</Text> : <View/>;
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
	row: {
		padding: 10,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderColor: '#f3f3f3'
	},
	placeholder: {
		padding: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	placeholderText: {
		fontSize: 20,
		color: 'gray'
	}
});

import {connect} from 'react-redux';
import React from 'react';
import {Component, View} from 'react-native';
import {List} from 'common/components';
import CustomerItem from './components/TodoItem';
import {loadCustomers} from '../customers/customers.actions.js';
import {Actions as routes} from 'react-native-router-flux';

class CustomersPage extends Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(loadCustomers({silent: true}));
    }

    render() {
        const {customers, dispatch} = this.props;
        const visibleCustomers = customers.items.filter(item => !item.isArchived);
        return (
            <View style={commonStyles.pageContainer}>
                <List
                    items={visibleCustomers}
                    status={customers.status}
                    renderItem={item =>
						<CustomerItem
							{...item}
							onPress={() => routes.customerEditPage({id: item.id, animationType: 'modalSide'})}
						/>
					}
                    placeholder="You don't have any customer yet"
                    onRefresh={() => dispatch(loadCustomers())}
                />
            </View>
        );
    }
}

export default connect(state => state)(CustomersPage);

import React, {Component, StyleSheet, View, Text, TouchableOpacity, PropTypes} from 'react-native';

var styles = StyleSheet.create({

});

class Counter extends Component {
    static propTypes = {
        counter: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        openProfile: PropTypes.func.isRequired
    };

    render() {
        const {counter, openProfile, increment, decrement} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.button}
                            onPress={increment}>
                        <Text>Increase</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                            onPress={decrement}>
                        <Text>Decrease</Text>
                    </TouchableOpacity>
                    <Text>Counter: {counter}</Text>
                </View>


                <View style={[styles.footer, styles.content]}>
                    <TouchableOpacity style={styles.button}
                            onPress={openProfile}>
                        <Text>Open User Profile</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

export default Counter;
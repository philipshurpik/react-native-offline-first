import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Counter from './components/Counter';
import {increment} from './todos.actions';

function mapStateToProps(state) {
    return {
        counter: state.counter
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(increment, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);


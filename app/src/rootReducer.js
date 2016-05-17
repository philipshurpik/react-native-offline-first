import { combineReducers } from 'redux';
import todos from './todos/todos.reducer';
import status from './common/status.reducer';

export default rootReducer = combineReducers({
	todos,
	status
});
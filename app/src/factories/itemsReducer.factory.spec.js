import constFactory from './const.factory.js';
import itemsReducerFactory from './itemsReducer.factory.js';
import {SYNC_STATUS} from '../utils/itemSyncUtils';

describe('itemsReducer.factory', () => {
	const types = constFactory('customer');
	const itemsReducer = itemsReducerFactory(types);

	let mockState, mockInitialItem, mockClientItem, mockServerItem;

	beforeEach(() => {
		mockInitialItem = {id: 'initial', _status: SYNC_STATUS.START};
		mockClientItem = {id: "clientId", _isNew: true, value: 'smth', _status: SYNC_STATUS.START};
		mockServerItem = {id: "serverId", value: 'smth2'};
		mockState = [mockInitialItem];
	});

	describe('load items', () => {
		it('should merge items on load success', () => {
			const action = {
				type: types.LOAD_SUCCESS,
				payload: [mockServerItem]
			};

			const newState = itemsReducer(mockState, action);
			expect(newState).includes(mockInitialItem);
			expect(newState).includes(mockServerItem);
		});
	});

	describe('create/update/delete customer success', () => {
		beforeEach(() => {
			mockState.push(mockClientItem);
		});

		it('should replace item client id on server id on create', () => {
			const action = {
				type: types.CREATE_SUCCESS,
				payload: mockServerItem,
				meta: {id: mockClientItem.id}
			};

			const newState = itemsReducer(mockState, action);
			expect(newState.length).to.equal(2);
			expect(newState).includes(mockServerItem);
		});

		['DELETE', 'UPDATE'].forEach(actionType => {
			it('should ' + actionType + ' existing item', () => {
				const changedItem = {
					...mockClientItem,
					someChanges: true
				};

				const action = {
					type: types[actionType + "_SUCCESS"],
					payload: changedItem
				};

				const newState = itemsReducer(mockState, action);
				expect(newState.length).to.equal(2);
				expect(newState).includes(changedItem);
			});
		});
	});

	describe('delete customer', () => {
		context('customer not synced', () => {
			it('should just delete it from store', () => {
				mockState.push(mockClientItem);

				const action = {
					type: types.DELETE_NEW,
					payload: {id: mockClientItem.id}
				};

				const newState = itemsReducer(mockState, action);

				expect(newState.length).to.equal(1);
				expect(newState).includes(mockInitialItem);
			});
		});

		context('customer synced, error occured', () => {
			it('should remove deleted flag from item', () => {
				const deletedItem = {
					...mockServerItem,
					_isDeleted: true
				};
				mockState.push(deletedItem);

				const action = {
					type: types.DELETE_ERROR,
					payload: deletedItem
				};

				const newState = itemsReducer(mockState, action);

				expect(newState.length).to.equal(2);
				expect(newState).includes({
					...mockServerItem,
					_isDeleted: false,
					_status: SYNC_STATUS.ERROR
				});
			});
		});
	});

	describe('create new customer start',() => {
		it('should add new item', () => {
			const action = {
				type: types.CREATE_START,
				payload: mockClientItem
			};

			const newState = itemsReducer(mockState, action);
			expect(newState).includes(mockInitialItem);
			expect(newState).includes({
				...mockClientItem,
				_status: SYNC_STATUS.START
			});
		});
	});

	describe('create/update/delete customer start/noconnection/error',() => {
		beforeEach(() => {
			mockState.push(mockClientItem);
		});

		["UPDATE_START", "DELETE_START", "CREATE_NO_CONNECTION",
			"UPDATE_NO_CONNECTION", "DELETE_NO_CONNECTION", "CREATE_ERROR",
			"UPDATE_ERROR"].forEach(actionName => {

			it('should replace existing item and set status on ' + actionName, () => {
				const action = {
					type: types[actionName],
					payload: {
						...mockClientItem,
						changes: true
					}
				};

				const newState = itemsReducer(mockState, action);
				expect(newState).includes(mockInitialItem);
				expect(newState[1]).to.have.property('id', mockClientItem.id);
				expect(newState[1]).to.have.property('changes', true);
				expect(newState[1]).to.have.property('_status');
			});
		});
	})
});

import constFactory from './const.factory.js';

describe('const.factory', () => {

	let types;
	const entityName = 'ENTITY';
	
	beforeEach(() => {
		types = constFactory(entityName);
	});
	
	it('should make load types', () => {
		expect(types.LOAD_START).to.equal("LOAD_" + entityName + "S_START");
		expect(types.LOAD_SUCCESS).to.equal("LOAD_" + entityName + "S_SUCCESS");
		expect(types.LOAD_NO_CONNECTION).to.equal("LOAD_" + entityName + "S_NO_CONNECTION");
		expect(types.LOAD_ERROR).to.equal("LOAD_" + entityName + "S_ERROR");
	});

	it('should make create types', () => {
		expect(types.CREATE_START).to.equal("CREATE_" + entityName + "_START");
		expect(types.CREATE_SUCCESS).to.equal("CREATE_" + entityName + "_SUCCESS");
		expect(types.CREATE_NO_CONNECTION).to.equal("CREATE_" + entityName + "_NO_CONNECTION");
		expect(types.CREATE_ERROR).to.equal("CREATE_" + entityName + "_ERROR");
	});

	it('should make create types', () => {
		expect(types.UPDATE_START).to.equal("UPDATE_" + entityName + "_START");
		expect(types.UPDATE_SUCCESS).to.equal("UPDATE_" + entityName + "_SUCCESS");
		expect(types.UPDATE_NO_CONNECTION).to.equal("UPDATE_" + entityName + "_NO_CONNECTION");
		expect(types.UPDATE_ERROR).to.equal("UPDATE_" + entityName + "_ERROR");
	});

	it('should make delete types', () => {
		expect(types.DELETE_START).to.equal("DELETE_" + entityName + "_START");
		expect(types.DELETE_SUCCESS).to.equal("DELETE_" + entityName + "_SUCCESS");
		expect(types.DELETE_NO_CONNECTION).to.equal("DELETE_" + entityName + "_NO_CONNECTION");
		expect(types.DELETE_ERROR).to.equal("DELETE_" + entityName + "_ERROR");
		expect(types.DELETE_NEW).to.equal("DELETE_NEW_" + entityName);
	});
});
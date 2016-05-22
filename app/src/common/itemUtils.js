export const itemComparator = (a, b) => {
	return a._isNew !== b._isNew
		? (a._isNew ? -1 : 1)
		: b.id.localeCompare(a.id);
};

export const addOrReplaceItem = (list, newItem) => {
	return list.find(item => item.id === newItem.id) ? replaceById(list, newItem) : [
		newItem,
		...list
	];
};

export const replaceById = (list, newItem, id) => {
	id = id || newItem.id;
	const item = list.find(item => item.id === id);
	const index = list.indexOf(item);
	const copy = list.slice();
	if (index !== -1) {
		copy[index] = newItem;
	} else {
		console.warn('Warning! Possible error!   replaceById not find item ', id, ' in list ', list);
	}
	return copy;
};

export const removeById = (list, id) => {
	return list.filter(item => item.id !== id);
};
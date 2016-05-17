export default function replaceById(list, payload, id) {
	id = id || payload.id;
	const item = list.find(item => item.id === id);
	const index = list.indexOf(item);
	const copy = list.slice();
	if (index === -1) {
		copy.push(payload);
	} else {
		copy[index] = payload;
	}
	return copy;
}

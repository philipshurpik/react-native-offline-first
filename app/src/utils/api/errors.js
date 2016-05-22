export function HttpError(error, res) {
	Object.assign(this, error);
	this.status = res.status;
	this.statusText = res.statusText;
	this.url = res.url;
	this.stack = new Error().stack.split('\n').slice(1).join('\n');
}
HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.toString = function () {
	return `${this.status} ${this.url} ${this.message}`;
};

export function NetworkError(error, url) {
	this.message = error.message;
	this.stack = error.stack.replace('TypeError', 'NetworkError');
	this.url = url;
}
NetworkError.prototype = Object.create(Error.prototype);
NetworkError.prototype.toString = function () {
	return `${this.message} ${this.url}`;
};
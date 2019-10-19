const mongoose = require('mongoose');
const urlPattern = /^https?:\/\/[^\.]{1,}[^\/]{1,}(?:\/[^\/\s]+){1,}/i;

function Url(key, options) {
	mongoose.SchemaType.call(this, key, options, 'Url');
}

Url.prototype = Object.create(mongoose.SchemaType.prototype);

Url.prototype.cast = function (value) {
	if (urlPattern.test(value) == false) {
		throw new Error(`Invalid URL: ${value}`);
	}
	return value;
};

mongoose.Schema.Types.Url = Url;

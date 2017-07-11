'use strict';
const devices = require('./data').devices;

module.exports = items => {
	if (items && !Array.isArray(items)) {
		throw new TypeError(`Expected \`Array\`, got \`${typeof items}\``);
	}

	if (!items) {
		return devices;
	}

	const ret = items
		.map(x => x.split(' ').join('').toLowerCase())
		.reduce((arr, x) => arr.concat(devices.filter(y => y.name.split(' ').join('').includes(x))), []);

	if (ret.length === 0) {
		throw new Error('Couldn\'t get any items');
	}

	return ret;
};

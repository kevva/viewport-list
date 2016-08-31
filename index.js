'use strict';
const devices = require('./data.json').devices;

module.exports = items => {
	if (items && !Array.isArray(items)) {
		throw new Error(`Expected \`Array\`, got \`${typeof items}\``);
	}

	if (!items) {
		return devices;
	}

	items = items.map(x => x.split(' ').join('').toLowerCase());

	let ret = [];

	for (const x of items) {
		ret = ret.concat(devices.filter(y => y.name.split(' ').join('').includes(x)));
	}

	if (!ret.length) {
		throw new Error('Couldn\'t get any items');
	}

	return ret;
};

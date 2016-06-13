'use strict';
const devices = require('./data.json').devices;

module.exports = items => {
	if (items && !Array.isArray(items)) {
		throw new Error(`Expected an \`Array\`, found a \`${typeof items}\``);
	}

	if (!items) {
		return devices;
	}

	items = items.map(item => item.split(' ').join('').toLowerCase());

	let ret = [];

	for (const item of items) {
		ret = ret.concat(devices.filter(device => device.name.split(' ').join('').includes(item)));
	}

	if (!ret.length) {
		throw new Error('Couldn\'t get any items');
	}

	return ret;
};

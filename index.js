'use strict';
var arrify = require('arrify');
var devices = require('./data.json').devices;

module.exports = function (items) {
	items = arrify(items);

	if (!items.length) {
		return devices;
	}

	items = items.map(function (item) {
		return item.split(' ').join('').toLowerCase();
	});

	var ret = [];

	items.forEach(function (item) {
		devices.filter(function (device) {
			return device.name.split(' ').join('').indexOf(item) !== -1;
		}).forEach(function (device) {
			ret.push(device);
		});
	});

	if (!ret.length) {
		throw new Error('Couldn\'t get any items');
	}

	return ret;
};

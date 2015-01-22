'use strict';

var getProxy = require('get-proxy');
var got = require('got');
var url = require('url');

/**
 * Return a list of devices and their viewports
 *
 * @param {Array} items
 * @param {Object} opts
 * @param {Function} cb
 * @api public
 */

module.exports = function (items, cb) {
	var opts = {};

	if (typeof items === 'function' && !cb) {
		cb = items;
		items = [];
	}

	if (getProxy()) {
		opts.host = url.parse(getProxy()).hostname;
		opts.port = url.parse(getProxy()).port;
		opts.path = 'http://viewportsizes.com/devices.json';
		opts.headers = { Host: 'http://viewportsizes.com/devices.json' };
	}

	if (items.length) {
		items = items.map(function (item) {
			return item.split(' ').join('').toLowerCase();
		});
	}

	got('http://viewportsizes.com/devices.json', opts, function (err, res) {
		if (err) {
			cb(err);
			return;
		}

		var ret = [];
		var sizes = JSON.parse(res).map(function (size) {
			return {
				name: size['Device Name'].toLowerCase(),
				platform: size.Platform.toLowerCase(),
				os: size['OS Version'].toLowerCase(),
				size: size['Portrait Width'] + 'x' + size['Landscape Width'],
				release: size['Release Date']
			};
		});

		if (!items.length) {
			cb(null, sizes);
			return;
		}

		items.forEach(function (item) {
			sizes.filter(function (size) {
				return size.name.split(' ').join('').indexOf(item) !== -1;
			}).forEach(function (size) {
				ret.push(size);
			});
		});

		if (!ret.length) {
			cb(new Error('Couldn\'t get any items'));
			return;
		}

		cb(null, ret);
	});
};

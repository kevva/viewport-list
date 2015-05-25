'use strict';

var url = require('url');
var getProxy = require('get-proxy');
var got = require('got');

module.exports = function (items, cb) {
	var opts = {json: true};
	var proxy = getProxy();

	if (typeof items === 'function' && !cb) {
		cb = items;
		items = [];
	}

	if (proxy) {
		opts.host = url.parse(proxy).hostname;
		opts.port = url.parse(proxy).port;
		opts.path = 'http://viewportsizes.com/devices.json';
		opts.headers = {Host: 'http://viewportsizes.com/devices.json'};
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
		var sizes = res.map(function (size) {
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

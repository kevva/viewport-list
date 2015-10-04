'use strict';
var url = require('url');
var arrify = require('arrify');
var getProxy = require('get-proxy');
var got = require('got');

module.exports = function (items) {
	var opts = {json: true};
	var proxy = getProxy();

	items = arrify(items);

	if (items.length) {
		items = items.map(function (item) {
			return item.split(' ').join('').toLowerCase();
		});
	}

	if (proxy) {
		opts.host = url.parse(proxy).hostname;
		opts.port = url.parse(proxy).port;
		opts.path = 'http://viewportsizes.com/devices.json';
		opts.headers = {Host: 'http://viewportsizes.com/devices.json'};
	}

	return got('http://viewportsizes.com/devices.json', opts).then(function (res) {
		var ret = [];
		var sizes = res.body.map(function (size) {
			return {
				name: size['Device Name'].toLowerCase(),
				platform: size.Platform.toLowerCase(),
				os: size['OS Version'].toLowerCase(),
				size: size['Portrait Width'] + 'x' + size['Landscape Width'],
				release: size['Release Date']
			};
		});

		if (!items.length) {
			return sizes;
		}

		items.forEach(function (item) {
			sizes.filter(function (size) {
				return size.name.split(' ').join('').indexOf(item) !== -1;
			}).forEach(function (size) {
				ret.push(size);
			});
		});

		if (!ret.length) {
			throw new Error('Couldn\'t get any items');
		}

		return ret;
	});
};

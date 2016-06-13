#!/usr/bin/env node
'use strict';
var fs = require('fs');
var Promise = require('pinkie-promise');
var pify = require('pify');
var got = require('got');
var fsP = pify(fs, Promise);

got('viewportsizes.com/devices.json', {json: true})
	.then(function (res) {
		var devices = res.body.map(function (size) {
			return {
				name: size['Device Name'].toLowerCase(),
				platform: size.Platform.toLowerCase(),
				os: size['OS Version'].toLowerCase(),
				size: size['Portrait Width'] + 'x' + size['Landscape Width'],
				release: size['Release Date']
			};
		});

		var data = {
			timestamp: new Date(),
			devices: devices
		};

		return fsP.writeFile('data.json', JSON.stringify(data, undefined, '\t'));
	})
	.catch(function (err) {
		console.error(err);
		process.exit(1);
	});

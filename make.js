#!/usr/bin/env node
'use strict';
const fs = require('fs');
const pify = require('pify');
const got = require('got');
const fsP = pify(fs);

got('viewportsizes.com/devices.json', {json: true})
	.then(res => {
		const devices = res.body.map(size => ({
			name: size['Device Name'].toLowerCase(),
			platform: size.Platform.toLowerCase(),
			os: size['OS Version'].toLowerCase(),
			size: `${size['Portrait Width']}x${size['Landscape Width']}`,
			release: size['Release Date']
		}));

		const data = {
			timestamp: new Date(),
			devices
		};

		return fsP.writeFile('data.json', JSON.stringify(data, undefined, '\t'));
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});

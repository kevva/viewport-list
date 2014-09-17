'use strict';

var got = require('got');

/**
 * Return a list of devices and their viewports
 *
 * @param {Array} items
 * @param {Function} cb
 * @api public
 */

module.exports = function (items, cb) {
    if (!cb && typeof items === 'function') {
        cb = items;
        items = [];
    }

    if (items.length) {
        items = items.map(function (item) {
            return item.split(' ').join('').toLowerCase();
        });
    }

    got('http://viewportsizes.com/devices.json', function (err, res) {
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

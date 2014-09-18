'use strict';

var assign = require('object-assign');
var got = require('got');

/**
 * Return a list of devices and their viewports
 *
 * @param {Array} items
 * @param {Object} opts
 * @param {Function} cb
 * @api public
 */

module.exports = function (items, opts, cb) {
    items = items || [];

    if (typeof items === 'function' && !opts && !cb) {
        cb = items;
        opts = {};
        items = [];
    } else if (typeof opts === 'function' && !cb) {
        cb = opts;
        opts = {};
    }

    if (opts.host && opts.port) {
        opts.path = 'http://viewportsizes.com/devices.json';
        opts.headers = assign({
            Host: 'http://viewportsizes.com/devices.json'
        }, opts.headers || {});
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

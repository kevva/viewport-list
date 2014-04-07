'use strict';

var got = require('got');
var slugify = require('slugify');

/**
 * Return a list of devices and their viewports
 *
 * @param {String|Array} item
 * @param {Function} cb
 * @api public
 */

module.exports = function (item, cb) {
    var items = [];
    var ret = [];

    if (!cb && typeof item === 'function') {
        cb = item;
        item = null;
    }

    if (item && item.length !== 0) {
        item = Array.isArray(item) ? item : [item];
        item.forEach(function (name) {
            name = name.split(' ').join('').toLowerCase();
            items.push(name);
        });
    }

    got('http://viewportsizes.com/devices.json', function (err, res) {
        if (err) {
            return cb(err);
        }

        var arr = [];
        var sizes = JSON.parse(res);

        if (!item || item.length === 0) {
            sizes.forEach(function (item) {
                ret.push({
                    name: slugify(item['Device Name']).toLowerCase(),
                    platform: item.Platform,
                    os: item['OS Version'],
                    size: item['Portrait Width'] + 'x' + item['Landscape Width'],
                    release: item['Release Date']
                });
            });

            return cb(null, ret);
        }

        items.forEach(function (item) {
            var i = sizes.filter(function (size) {
                return size['Device Name'].split(' ').join('').toLowerCase().indexOf(item) !== -1;
            });

            arr = arr.concat(i);
        });

        if (arr.length === 0) {
            return cb('Couldn\'t get any items');
        }

        arr.forEach(function (item) {
            ret.push({
                name: slugify(item['Device Name']).toLowerCase(),
                platform: item.Platform,
                os: item['OS Version'],
                size: item['Portrait Width'] + 'x' + item['Landscape Width'],
                release: item['Release Date']
            });
        });

        cb(null, ret);
    });
};

'use strict';
var test = require('ava');
var viewport = require('./');

test('return viewports', function (t) {
	t.plan(2);

	viewport(['iphone 4', 'iphone 5'], function (err, res) {
		t.assert(!err, err);
		t.assert(res.length === 5, res.length);
	});
});

test('return all viewports', function (t) {
	t.plan(2);

	viewport(function (err, res) {
		t.assert(!err, err);
		t.assert(res.length > 50, res.length);
	});
});

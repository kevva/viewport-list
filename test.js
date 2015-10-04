import test from 'ava';
import viewportList from './';

test('return viewports', t => {
	t.plan(2);

	viewportList(['iphone 4', 'iphone 5'], (err, res) => {
		t.ifError(err);
		t.is(res.length, 5);
	});
});

test('return all viewports', t => {
	t.plan(2);

	viewportList((err, res) => {
		t.ifError(err);
		t.ok(res.length > 50);
	});
});

import test from 'ava';
import viewportList from './';

test('return viewports', t => {
	t.plan(1);

	viewportList(['iphone 4', 'iphone 5']).then(res => {
		t.is(res.length, 5);
	});
});

test('return all viewports', t => {
	t.plan(1);

	viewportList().then(res => {
		t.ok(res.length > 50);
	});
});

test('error when no viewports are found', t => {
	t.plan(2);

	viewportList(['foobar']).catch(err => {
		t.ok(err);
		t.is(err.message, 'Couldn\'t get any items');
	});
});

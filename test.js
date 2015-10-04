import test from 'ava';
import viewportList from './';

test('return viewports', async t => {
	t.plan(1);
	const viewports = await viewportList(['iphone 4', 'iphone 5']);
	t.is(viewports.length, 5);
});

test('return all viewports', async t => {
	t.plan(1);
	const viewports = await viewportList();
	t.ok(viewports.length > 50);
});

test('error when no viewports are found', t => {
	t.plan(2);

	viewportList(['foobar']).catch(err => {
		t.ok(err);
		t.is(err.message, 'Couldn\'t get any items');
	});
});

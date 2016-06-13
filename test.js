import test from 'ava';
import m from './';

test('return viewports', async t => {
	const viewports = await m(['iphone 4', 'iphone 5']);
	t.is(viewports.length, 5);
});

test('return all viewports', async t => {
	const viewports = await m();
	t.true(viewports.length > 50);
});

test('error when no viewports are found', t => {
	t.throws(m.bind(undefined, ['foobar']), 'Couldn\'t get any items');
});

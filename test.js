import test from 'ava';
import fn from './';

test('return viewports', async t => {
	const viewports = await fn(['iphone 4', 'iphone 5']);
	t.is(viewports.length, 5);
});

test('return all viewports', async t => {
	const viewports = await fn();
	t.true(viewports.length > 50);
});

test('error when no viewports are found', t => {
	t.throws(fn.bind(undefined, ['foobar']), 'Couldn\'t get any items');
});

import test from 'ava';
import fn from './';

test('return viewports', async t => {
	const viewports = await fn(['iphone 4', 'iphone 5']);
	t.is(viewports.length, 5);
});

test('return all viewports', async t => {
	const viewports = await fn();
	t.ok(viewports.length > 50);
});

test('error when no viewports are found', async t => {
	try {
		await fn(['foobar']);
		t.fail();
	} catch (err) {
		t.ok(err);
		t.is(err.message, 'Couldn\'t get any items');
	}
});

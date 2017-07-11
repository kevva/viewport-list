import test from 'ava';
import m from '.';

test('wrong input', t => {
	t.throws(m.bind(undefined, 'foobar'), 'Expected `Array`, got `string`');
});

test('error when no viewports are found', t => {
	t.throws(m.bind(undefined, ['foobar']), 'Couldn\'t get any items');
});

test('return viewports', t => {
	t.is(m(['iphone 4', 'iphone 5']).length, 5);
});

test('return all viewports', t => {
	t.true(m().length > 50);
});

test('custom devices', t => {
	t.is(m(['iphone 7']).length, 2);
});

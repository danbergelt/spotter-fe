import helpers from 'src/utils/stateHelpers';
const { replaceAll, replaceOne, remove, exists } = helpers;

const arrayOfObjects = [
  { _id: 'bar', bar: 'baz' },
  { _id: 'baz', baz: 'qux' }
];

describe('state helpers', () => {
  test('replace all', () => {
    const stale = { foo: 'bar', bar: 'baz' };
    const hydrated = { foo: 'baz', bar: 'bar' };
    replaceAll(stale, hydrated);
    expect(stale).toStrictEqual(hydrated);
  });

  test('replace one', () => {
    const arr = [...arrayOfObjects];
    const replacement = { _id: 'bar', bar: 'qux', baz: 'qux' };
    replaceOne(arr, replacement);
    expect(arr[0]).toStrictEqual(replacement);
  });

  test('exists (true)', () => {
    const arr = [...arrayOfObjects];
    expect(exists(arr, 'baz')).toBeTruthy();
  });

  test('exists (false)', () => {
    const arr = [...arrayOfObjects];
    expect(exists(arr, 'foo')).toBeFalsy();
  });

  test('remove', () => {
    const arr = [...arrayOfObjects];
    expect(arr.length).toBe(2);
    remove(arr, 'baz');
    expect(arr.length).toBe(1);
  });
});

import endpoint from '../../../utils/endpoint';

describe('endpoint builder', () => {
  test('builds endpoint with passed in data', () => {
    process.env.NODE_ENV = 'development';
    const str = endpoint('foobar');
    expect(str).toEqual(`${process.env.REACT_APP_T_API}/api/auth/foobar`);
    process.env.NODE_ENV = 'test';
  });
});

import axiosBuilder from '../../../utils/axiosBuilder';

jest.unmock('axios');

describe('axios with auth', () => {
  test('create axios instance with token to use for calls', () => {
    expect(axiosBuilder('token').defaults.headers.Authorization).toEqual(
      'Bearer token'
    );
  });

  test('creates axios instance even with no token', () => {
    expect(axiosBuilder().defaults.headers.Authorization).toEqual(
      'Bearer undefined'
    );
  });
});

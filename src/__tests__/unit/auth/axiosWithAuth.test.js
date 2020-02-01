import axiosWithAuth from '../../../utils/axiosWithAuth';

jest.unmock('axios');

describe('axios with auth', () => {
  test('create axios object to use for calls', () => {
    expect(axiosWithAuth('token').defaults.headers.Authorization).toEqual(
      'Bearer token'
    );
  });
});

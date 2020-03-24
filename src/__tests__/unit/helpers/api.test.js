import api from '../../../utils/api';

const reset = () => {
  process.env.NODE_ENV = 'test';
  delete process.env.REACT_APP_STAGING;
};

describe('builds endpoint root based on env', () => {
  test('dev mode', () => {
    process.env.NODE_ENV = 'development';
    expect(api()).toEqual(process.env.REACT_APP_T_API);
    reset();
  });

  test('staging mode', () => {
    process.env.NODE_ENV = 'production';
    process.env.REACT_APP_STAGING = 'true';
    expect(api()).toEqual(process.env.REACT_APP_S_API);
    reset();
  });

  test('production mode', () => {
    process.env.NODE_ENV = 'production';
    expect(api()).toEqual(process.env.REACT_APP_API);
    reset();
  });
});

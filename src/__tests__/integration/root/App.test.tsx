import React from 'react';
import axios from 'axios';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import App from 'src/App';
import { wait } from '@testing-library/dom';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('app wrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders routes on successful request', async () => {
    mockAxios.get.mockResolvedValue({ data: { token: 'foo' } });
    const { history, queryByTestId } = wrapper(reducer, <App />);
    expect(queryByTestId(/spinner/i)).toBeTruthy();
    // since default route is /, will redirect to dashboard on successful token fetch
    await wait(() => expect(history.location.pathname).toEqual('/dashboard'));
    expect(queryByTestId(/spinner/i)).toBeFalsy();
  });

  test('500 renders on failed request', async () => {
    mockAxios.get.mockRejectedValue({ error: 'foo' });
    const { history, queryByTestId } = wrapper(reducer, <App />);
    expect(queryByTestId(/spinner/i)).toBeTruthy();
    await wait(() => expect(history.location.pathname).toEqual('/500'));
    expect(queryByTestId(/spinner/i)).toBeFalsy();
  });
});

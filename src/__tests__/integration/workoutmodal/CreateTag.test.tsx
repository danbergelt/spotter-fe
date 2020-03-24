import React from 'react';
import { hs } from 'src/__testUtils__/hs';
import Create from 'src/components/dash/workoutmodal/actions/tags/Create';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import { fireEvent, wait } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const setTags = jest.fn();

describe('create new tag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('input can be typed in', async () => {
    const { getByTestId } = wrapper(
      reducer,
      <Create hs={hs} setTags={setTags} />
    );

    const input = getByTestId(/input/i);
    await act(async () => {
      await fireEvent.change(input, { target: { value: 'foo' } });
    });
    expect(input.getAttribute('value')).toBe('foo');
  });

  test('can pick between multiple colors', () => {
    const { getAllByTestId, getByTestId } = wrapper(
      reducer,
      <Create hs={hs} setTags={setTags} />
    );

    const colors = getAllByTestId(/color/i);
    expect(colors.length).toBe(10);
    const check = getByTestId(/check/i);
    const first = getAllByTestId(/color/i)[0];
    const last = getAllByTestId(/color/i)[9];
    expect(first.firstChild).toStrictEqual(check);
    expect(last.firstChild).not.toStrictEqual(check);
    fireEvent.click(last);
    expect(first.firstChild).not.toStrictEqual(check);
    expect(last.firstChild).toStrictEqual(check);
  });

  test('successful request returns message', async () => {
    mockAxios.post.mockResolvedValue({ data: 'foobar' });
    const { getByText } = wrapper(
      reducer,
      <Create hs={hs} setTags={setTags} />
    );

    fireEvent.click(getByText(/create/i));

    await wait(() => getByText(/tag created/i));
  });

  test('errored request returns message', async () => {
    mockAxios.post.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });
    const { getByText } = wrapper(
      reducer,
      <Create hs={hs} setTags={setTags} />
    );

    fireEvent.click(getByText(/create/i));

    await wait(() => getByText(/foobar/i));
  });
});

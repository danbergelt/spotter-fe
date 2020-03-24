import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Manage from 'src/components/dash/workoutmodal/actions/tags/Manage';
import { tag } from 'src/__testUtils__/tag';
import { hs } from 'src/__testUtils__/hs';
import { fireEvent, wait } from '@testing-library/dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const setTags = jest.fn();
const setTab = jest.fn();
const tags = [tag];

describe('manage tags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders tags', () => {
    const { getByText } = wrapper(
      reducer,
      <Manage hs={hs} setTags={setTags} setTab={setTab} tags={tags} />
    );

    getByText(/bar/i);
  });

  test('renders placeholder if no tags found', () => {
    const { getByText } = wrapper(
      reducer,
      <Manage hs={hs} setTags={setTags} setTab={setTab} tags={[]} />
    );

    getByText(/no tags found/i);
  });

  test('can delete tag', async () => {
    mockAxios.delete.mockResolvedValue({ data: 'foobar' });
    const { getByText } = wrapper(
      reducer,
      <Manage hs={hs} setTags={setTags} setTab={setTab} tags={tags} />
    );

    fireEvent.click(getByText(/delete/i));

    getByText(/are you sure/i);

    fireEvent.click(getByText(/Delete/));

    await wait(() => expect(mockAxios.delete).toHaveBeenCalledTimes(1));
    await wait(() => expect(setTags).toHaveBeenCalledTimes(1));
    await wait(() => expect(setTab).toHaveBeenCalledTimes(1));
  });

  test('renders error message on failed delete', async () => {
    mockAxios.delete.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });

    const { getByText } = wrapper(
      reducer,
      <Manage hs={hs} setTags={setTags} setTab={setTab} tags={tags} />
    );

    fireEvent.click(getByText(/delete/i));

    getByText(/are you sure/i);

    fireEvent.click(getByText(/Delete/));

    await wait(() => getByText(/foobar/i));
  });

  test('successfully edits a tag', async () => {
    mockAxios.put.mockResolvedValue({ data: 'foobar' });

    const { getByText, getByPlaceholderText, queryByPlaceholderText } = wrapper(
      reducer,
      <Manage hs={hs} setTags={setTags} setTab={setTab} tags={tags} />
    );

    fireEvent.click(getByText(/bar/i));

    const input = getByPlaceholderText(/edit tag name/i);

    await act(async () => {
      await fireEvent.change(input, { target: { value: 'foobar' } });
    });

    expect(input.getAttribute('value')).toBe('foobar');

    fireEvent.click(getByText(/edit/i));

    await wait(() => expect(mockAxios.put).toHaveBeenCalledTimes(1));
    await wait(() => expect(setTags).toHaveBeenCalledTimes(1));

    expect(queryByPlaceholderText(/edit tag name/i)).toBeFalsy();
  });

  test('displays error on bad edit tag request', async () => {
    mockAxios.put.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });

    const { getByText, getByPlaceholderText } = wrapper(
      reducer,
      <Manage hs={hs} setTags={setTags} setTab={setTab} tags={tags} />
    );

    fireEvent.click(getByText(/bar/i));

    const input = getByPlaceholderText(/edit tag name/i);

    await act(async () => {
      await fireEvent.change(input, { target: { value: 'foobar' } });
    });

    expect(input.getAttribute('value')).toBe('foobar');

    fireEvent.click(getByText(/edit/i));

    await wait(() => expect(mockAxios.put).toHaveBeenCalledTimes(1));

    getByText(/foobar/i);
  });
});

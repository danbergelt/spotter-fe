import React from 'react';
import axios from 'axios';
import { tag } from 'src/__testUtils__/tag';
import { reducer } from 'src/reducers';
import Tags from 'src/components/dash/workoutmodal/actions/tags/Tags';
import wrapper from 'src/__testUtils__/wrapper';
import { wait, fireEvent } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const nudgeBottom = jest.fn();
const nudgeLeft = jest.fn();

describe('tags popup on workout modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('can open popup, fetches tags, renders them, can close popup', async () => {
    mockAxios.get.mockResolvedValue({ data: { tags: [tag] } });
    const { getByText, getByTestId, queryByText } = wrapper(
      reducer,
      <Tags nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
    );

    const button = getByText(/Tags/);

    fireEvent.click(button);

    await wait(() => getByText(/bar/i));

    fireEvent.click(getByTestId(/close/i));

    expect(queryByText(/bar/i)).toBeFalsy();
  });

  test('can switch between tabs', async () => {
    mockAxios.get.mockResolvedValue({ data: { tags: [tag] } });
    const { getByText, getByPlaceholderText } = wrapper(
      reducer,
      <Tags nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
    );

    const button = getByText(/Tags/);

    fireEvent.click(button);

    await wait(() => getByText(/bar/i));

    fireEvent.click(getByText(/manage/i));

    getByText(/delete/i);

    fireEvent.click(getByText(/create/i));

    getByPlaceholderText(/tag name/i);

    fireEvent.click(getByText(/add/i));

    getByText(/bar/i);
  });

  test('editing tag changes tag name in real time', async () => {
    mockAxios.get.mockResolvedValue({ data: { tags: [tag] } });
    mockAxios.put.mockResolvedValue({
      data: { tag: { ...tag, content: 'baz' } }
    });
    const { getByText, getByPlaceholderText, queryByText } = wrapper(
      reducer,
      <Tags nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
    );

    const button = getByText(/Tags/);

    fireEvent.click(button);

    await wait(() => getByText(/bar/i));

    fireEvent.click(getByText(/manage/i));

    await act(async () => {
      await fireEvent.click(getByText(/bar/i));
    });

    await act(async () => {
      await fireEvent.change(getByPlaceholderText(/edit tag name/i), {
        target: { value: 'baz' }
      });
    });

    expect(queryByText(/baz/i)).toBeFalsy();

    await act(async () => {
      await fireEvent.click(getByText(/edit/i));
    });

    await wait(() => getByText(/baz/i));
  });

  test('deleting tag removes tag in real time', async () => {
    mockAxios.get.mockResolvedValue({ data: { tags: [tag] } });
    mockAxios.delete.mockResolvedValue({
      data: { tag }
    });
    const { getByText } = wrapper(
      reducer,
      <Tags nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
    );

    const button = getByText(/Tags/);

    fireEvent.click(button);

    await wait(() => getByText(/bar/i));

    fireEvent.click(getByText(/manage/i));

    fireEvent.click(getByText(/delete/i));

    fireEvent.click(getByText(/Delete/));

    await wait(() => getByText(/no tags found/i));
  });

  test('creating a tag adds to tags in real time', async () => {
    mockAxios.get.mockResolvedValue({ data: { tags: [tag] } });
    mockAxios.post.mockResolvedValue({
      data: { tag: { color: 'blue', _id: '1', content: 'new' } }
    });
    const { getByText, getByPlaceholderText, getByTestId } = wrapper(
      reducer,
      <Tags nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
    );

    const button = getByText(/Tags/);

    fireEvent.click(button);

    await wait(() => getByText(/bar/i));

    fireEvent.click(getByText(/create/i));

    await act(async () => {
      await fireEvent.change(getByPlaceholderText(/tag name/i), {
        target: { value: 'new' }
      });
    });

    fireEvent.click(getByTestId(/button/i));

    await wait(() => getByText(/tag created/i));

    fireEvent.click(getByText(/add/i));

    getByText(/new/i);
  });
});

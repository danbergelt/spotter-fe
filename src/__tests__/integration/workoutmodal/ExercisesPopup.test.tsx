import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Exercises from 'src/components/dash/workoutmodal/actions/exercises/Exercises';
import axios from 'axios';
import { e1 } from 'src/__testUtils__/exercise';
import { fireEvent, wait } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const nudgeLeft = jest.fn();
const nudgeBottom = jest.fn();

describe('exercises popup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('can open popup', async () => {
    mockAxios.get.mockResolvedValue({ data: { exercises: [e1] } });
    const { getByText } = wrapper(
      reducer,
      <Exercises nudgeLeft={nudgeLeft} nudgeBottom={nudgeBottom} />
    );

    const button = getByText(/exercises/i);

    fireEvent.click(button);

    await wait(() => expect(getByText(e1.name)).toBeTruthy());
  });

  test('deleted exercise removes from popup', async () => {
    mockAxios.get.mockResolvedValue({ data: { exercises: [e1] } });
    mockAxios.delete.mockResolvedValue({ data: { exercise: e1 } });
    const { getByText, getByTestId } = wrapper(
      reducer,
      <Exercises nudgeLeft={nudgeLeft} nudgeBottom={nudgeBottom} />
    );

    const button = getByText(/exercises/i);

    fireEvent.click(button);

    await wait(() => expect(getByText(e1.name)).toBeTruthy());

    await act(async () => {
      await fireEvent.click(getByTestId(/exercise-delete/i));
    });

    await wait(() => expect(getByText(/no exercises found/i)).toBeTruthy());
  });

  test('can close popup', async () => {
    mockAxios.get.mockResolvedValue({ data: { exercises: [e1] } });
    const { getByText, getByTestId, queryByText } = wrapper(
      reducer,
      <Exercises nudgeLeft={nudgeLeft} nudgeBottom={nudgeBottom} />
    );

    const button = getByText(/exercises/i);

    fireEvent.click(button);

    await wait(() => expect(getByText(e1.name)).toBeTruthy());

    fireEvent.click(getByTestId(/close/i));

    expect(queryByText(e1.name)).toBeFalsy();
  });

  test('can switch between tabs', async () => {
    mockAxios.get.mockResolvedValue({ data: { exercises: [e1] } });
    const { getByText, queryByTestId } = wrapper(
      reducer,
      <Exercises nudgeLeft={nudgeLeft} nudgeBottom={nudgeBottom} />
    );

    const button = getByText(/exercises/i);

    fireEvent.click(button);

    await wait(() => expect(getByText(e1.name)).toBeTruthy());

    expect(queryByTestId(/button/i)).toBeFalsy();

    fireEvent.click(getByText(/create/i));

    expect(queryByTestId(/button/i)).toBeTruthy();

    fireEvent.click(getByText(/manage/i));

    expect(queryByTestId(/button/i)).toBeFalsy();
  });
});

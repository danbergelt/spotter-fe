import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Manage from 'src/components/dash/workoutmodal/actions/exercises/Manage';
import { e1 } from '../../../__testUtils__/exercise';
import { fireEvent } from '@testing-library/dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
const setExercises = jest.fn();
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('manage exercises', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders', () => {
    const { getByText } = wrapper(
      reducer,
      <Manage setExercises={setExercises} exercises={[e1]} />
    );
    getByText(e1.name);
  });

  test('renders message when no exercises found', () => {
    const { getByText } = wrapper(
      reducer,
      <Manage setExercises={setExercises} exercises={[]} />
    );

    getByText(/no exercises found/i);
  });

  test('search filter works', () => {
    const { getByText, getByTestId } = wrapper(
      reducer,
      <Manage setExercises={setExercises} exercises={[e1]} />
    );
    fireEvent.change(getByTestId(/input/i), { target: { value: 'squa' } });
    getByText(/squat/i);
    fireEvent.change(getByTestId(/input/i), { target: { value: 'squay' } });
    getByText(/no exercises found/i);
  });

  test('successful delete query', async () => {
    mockAxios.delete.mockResolvedValue({ data: { exercise: e1 } });
    const { getByTestId } = wrapper(
      reducer,
      <Manage setExercises={setExercises} exercises={[e1]} />
    );

    await act(async () => {
      await fireEvent.click(getByTestId(/exercise-delete/i));
    });

    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  });

  test('renders error on failed delete query', async () => {
    mockAxios.delete.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });

    const { getByTestId, getByText } = wrapper(
      reducer,
      <Manage setExercises={setExercises} exercises={[e1]} />
    );

    await act(async () => {
      await fireEvent.click(getByTestId(/exercise-delete/i));
    });

    getByText(/foobar/i);
  });
});

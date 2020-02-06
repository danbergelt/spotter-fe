import React from 'react';
import axios from 'axios';
import WorkoutOptions from '../../../../components/dash/workoutmodal/optionsmenu/WorkoutOptions';
import Exercises from '../../../../components/dash/workoutmodal/optionsmenu/options/exercises/Exercises';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import wrapper from '../../../../__testUtils__/wrapper';
import Modal from 'react-modal';
import { reducer } from '../../../../reducers/index';
import { SET_EXERCISES } from '../../../../actions/optionsActions';
import { CREATE_EXERCISE } from '../../../../actions/fetchExercisesActions';

describe('exercises modal functionality', () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  Modal.setAppElement(document.createElement('div'));

  test('Can open and close exercises modal', () => {
    const { queryByPlaceholderText, getByTestId } = wrapper(
      reducer,
      <WorkoutOptions />
    );

    expect(queryByPlaceholderText(/search exercises.../i)).toBeFalsy();
    fireEvent.click(getByTestId(/exercises-modal/i));
    expect(queryByPlaceholderText(/search exercises.../i)).toBeTruthy();
    fireEvent.click(getByTestId(/quit-exercises/i));
    expect(queryByPlaceholderText(/search exercises.../i)).toBeFalsy();
  });

  test('Can switch between tabs on exercises modal', () => {
    const { queryByPlaceholderText, getByText, store } = wrapper(
      reducer,
      <Exercises />
    );

    store.dispatch({ type: SET_EXERCISES, payload: true });

    expect(queryByPlaceholderText(/search exercises.../i)).toBeTruthy();
    fireEvent.click(getByText(/create/i));
    expect(queryByPlaceholderText(/create exercise.../i)).toBeTruthy();
  });

  test('Can filter managed exercises', () => {
    const { queryByText, getByPlaceholderText, store } = wrapper(
      reducer,
      <Exercises />
    );

    store.dispatch({ type: SET_EXERCISES, payload: true });
    store.dispatch({
      type: CREATE_EXERCISE,
      payload: { name: 'managed name', _id: 1 }
    });

    expect(queryByText(/managed name/i)).toBeTruthy();
    const input = getByPlaceholderText(/search exercises.../i);
    fireEvent.change(input, { target: { value: 'm' } });
    expect(queryByText(/managed name/i)).toBeTruthy();
    fireEvent.change(input, { target: { value: 'mz' } });
    expect(queryByText(/managed name/i)).toBeFalsy();
  });

  test('Can delete exercise', async () => {
    axios.delete.mockResolvedValue({});
    const { queryByText, getByTestId, store } = wrapper(reducer, <Exercises />);

    store.dispatch({ type: SET_EXERCISES, payload: true });
    store.dispatch({
      type: CREATE_EXERCISE,
      payload: { name: 'managed name', _id: 1 }
    });

    expect(queryByText(/managed name/i)).toBeTruthy();
    fireEvent.click(getByTestId(/exercise-delete/i));
    await wait(() => expect(queryByText(/managed name/i)).toBeFalsy());
  });

  test('Can create exercise', async () => {
    axios.post.mockResolvedValue({
      data: { exercise: { name: 'created', _id: 1 } }
    });
    const { getByText, getByTestId, getByPlaceholderText, store } = wrapper(
      reducer,
      <Exercises />
    );

    store.dispatch({ type: SET_EXERCISES, payload: true });

    fireEvent.click(getByText(/create/i));
    const input = getByPlaceholderText(/create exercise.../i);
    fireEvent.change(input, { target: { value: 'created' } });
    fireEvent.click(getByTestId(/create-exercise/i));
    await wait(() => expect(getByText(/exercise created/i)).toBeTruthy());
    fireEvent.click(getByText(/manage/i));
    expect(getByText(/created/i)).toBeTruthy();
  });
});

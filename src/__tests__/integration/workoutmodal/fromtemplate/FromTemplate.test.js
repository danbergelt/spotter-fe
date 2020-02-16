import React from 'react';
import axios from 'axios';
import { FETCH_WORKOUTS_SUCCESS } from '../../../../actions/fetchWorkoutsActions';
import { act } from 'react-dom/test-utils';
import WorkoutModal from '../../../../components/dash/workoutmodal/WorkoutModal';
import WorkoutOptions from '../../../../components/dash/workoutmodal/optionsmenu/WorkoutOptions';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import mockTemplateRes from '../../../../__testUtils__/mockTemplateRes';
import wrapper from '../../../../__testUtils__/wrapper';
import Modal from 'react-modal';
import { reducer } from '../../../../reducers/index';

describe('from template functionality', () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  Modal.setAppElement(document.createElement('div'));

  test('Can open and close from template modal', async () => {
    axios.get.mockResolvedValue({});

    const { getByText, queryByPlaceholderText, getByTestId } = wrapper(
      reducer,
      <WorkoutOptions />
    );

    expect(queryByPlaceholderText(/search.../i)).toBeFalsy();
    fireEvent.click(getByText(/load template/i));
    await wait(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(queryByPlaceholderText(/search.../i)).toBeTruthy();
    fireEvent.click(getByTestId(/quit-from/i));
    expect(queryByPlaceholderText(/search.../i)).toBeFalsy();
  });

  test('can type in search bar', async () => {
    axios.get.mockResolvedValue(mockTemplateRes);
    const { getByPlaceholderText, container, getByText } = wrapper(
      reducer,
      <WorkoutOptions />
    );

    fireEvent.click(getByText(/load template/i));

    await wait(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const input = getByPlaceholderText(/search.../i);

    fireEvent.change(input, { target: { value: 'testing input' } });

    expect(container.innerHTML).toMatch('testing input');
  });

  test('filter works', async () => {
    axios.get.mockResolvedValue(mockTemplateRes);
    const { getByPlaceholderText, getByText } = wrapper(
      reducer,
      <WorkoutOptions />
    );

    fireEvent.click(getByText(/load template/i));

    await wait(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(getByText(/test template/i)).toBeTruthy();

    fireEvent.change(getByPlaceholderText(/search.../i), {
      target: { value: 'z' }
    });

    expect(getByText(/no templates found/i)).toBeTruthy();
  });

  test('can generate from template', async () => {
    axios.get.mockResolvedValue(mockTemplateRes);

    const { getByTestId, container, getByText, queryByText, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    store.dispatch({
      type: FETCH_WORKOUTS_SUCCESS,
      payload: { exercises: [], tags: [] }
    });

    fireEvent.click(getByText(/load template/i));

    await wait(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(getByText(/test template/i)).toBeTruthy();
    fireEvent.click(getByTestId(/generate-template/i));
    expect(queryByText(/workout for testing/i)).toBeFalsy();
    fireEvent.click(getByText(/test template/i));
    fireEvent.click(getByTestId(/generate-template/i));
    expect(container.innerHTML).toMatch('Workout FOR TESTING');
    expect(queryByText(/tag2/i)).toBeTruthy();
    expect(queryByText(/notes for workout/i)).toBeTruthy();
    expect(queryByText(/exercise2/i)).toBeTruthy();
  });

  test('can delete template', async () => {
    axios.get.mockResolvedValue(mockTemplateRes);
    axios.delete.mockResolvedValue({});
    const { getByText, getByTestId, queryByText } = wrapper(
      reducer,
      <WorkoutOptions />
    );
    fireEvent.click(getByText(/load template/i));
    await wait(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(getByText(/test template/i)).toBeTruthy();
    act(() => {
      fireEvent.click(getByTestId(/template-delete/i));
    });
    await wait(() => expect(queryByText(/test template/i)).toBeFalsy());
  });
});

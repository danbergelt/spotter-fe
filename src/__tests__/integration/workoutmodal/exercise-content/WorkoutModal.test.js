import React from 'react';
import Dashboard from '../../../../pages/Dashboard';
import WorkoutModal from '../../../../components/dash/workoutmodal/WorkoutModal';
import WorkoutData from '../../../../components/dash/workoutmodal/data/WorkoutData';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import wrapper from '../../../../__testUtils__/wrapper';
import Modal from 'react-modal';
import axios from 'axios';
import mockWorkoutRes from '../../../../__testUtils__/mockWorkoutRes';
import { reducer } from '../../../../reducers/index';
import { CREATE_EXERCISE } from '../../../../actions/fetchExercisesActions';
import userEvent from '@testing-library/user-event';

describe('add workout modal functionality', () => {
  // initial setup
  afterEach(cleanup);
  Modal.setAppElement(document.createElement('div'));

  test('open and close modal functionality', () => {
    // suppresses warning for rendering document.body directly in render function
    console.error = jest.fn();
    axios.post.mockResolvedValue(mockWorkoutRes);
    axios.get.mockResolvedValue({});
    const {
      queryByPlaceholderText,
      getByTestId,
      getAllByText,
      queryByTestId
    } = wrapper(reducer, <Dashboard />);

    fireEvent.click(getAllByText(/add workout/i)[0]);

    expect(queryByPlaceholderText(/e.g. squat/i)).toBeTruthy();
    expect(queryByTestId(/exit-modal/i)).toBeTruthy();

    fireEvent.click(getByTestId(/exit-modal/i));

    expect(queryByTestId(/exit-modal/i)).toBeFalsy();
    expect(queryByPlaceholderText(/e.g. squat/i)).toBeFalsy();
  });

  test('can hold user-entered text in title and notes', () => {
    const { container, queryByTestId, getByPlaceholderText } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    expect(queryByTestId(/exit-modal/i)).toBeTruthy();

    const title = getByPlaceholderText(/click to enter a title.../i);

    fireEvent.change(title, { target: { value: 'test title' } });

    expect(container.innerHTML).toMatch(/test title/i);

    const notes = getByPlaceholderText(/click to enter some notes.../i);

    fireEvent.change(notes, { target: { value: 'test notes' } });

    expect(container.innerHTML).toMatch(/test notes/i);
  });

  test('edit notes focuses notes', () => {
    const { container, queryByText, getByPlaceholderText } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const notes = getByPlaceholderText(/click to enter some notes.../i);

    fireEvent.change(notes, { target: { value: 'test notes' } });

    expect(container.innerHTML).toMatch(/test notes/i);

    fireEvent.blur(notes);

    expect(queryByText(/edit/i)).toBeTruthy();

    fireEvent.click(queryByText(/edit/i));

    expect(document.activeElement).toEqual(notes);
  });

  test('trashcan empties notes', () => {
    const { container, getByTestId, getByPlaceholderText } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const notes = getByPlaceholderText(/click to enter some notes.../i);

    fireEvent.change(notes, { target: { value: 'test notes' } });

    expect(container.innerHTML).toMatch(/test notes/i);

    fireEvent.focus(getByPlaceholderText(/click to enter some notes.../i));

    fireEvent.mouseDown(getByTestId(/trash$/i));

    expect(container.innerHTML).not.toMatch(/test notes/i);
  });

  test('exercise form inputs work', () => {
    const { getByPlaceholderText } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const name = getByPlaceholderText(/e.g. squat/i);
    const weight = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    fireEvent.change(name, { target: { value: 'test name' } });
    expect(name.value).toEqual('test name');

    fireEvent.change(weight, { target: { value: 100 } });
    expect(weight.value).toEqual('100');

    fireEvent.change(sets, { target: { value: 100 } });
    expect(sets.value).toEqual('100');

    fireEvent.change(reps, { target: { value: 100 } });
    expect(reps.value).toEqual('100');
  });

  test("can't enter letters in number inputs", () => {
    const { getByPlaceholderText } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const weight = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    fireEvent.change(weight, { target: { value: 'a' } });
    expect(weight.value).toEqual('');

    fireEvent.change(sets, { target: { value: 'a' } });
    expect(sets.value).toEqual('');

    fireEvent.change(reps, { target: { value: 'a' } });
    expect(reps.value).toEqual('');
  });

  test('trashcan empties exercise inputs', () => {
    const { getByPlaceholderText, getByTestId } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const name = getByPlaceholderText(/e.g. squat/i);
    const weight = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    fireEvent.change(name, { target: { value: 'test name' } });
    expect(name.value).toEqual('test name');
    fireEvent.change(weight, { target: { value: 100 } });
    expect(weight.value).toEqual('100');
    fireEvent.change(sets, { target: { value: 100 } });
    expect(sets.value).toEqual('100');
    fireEvent.change(reps, { target: { value: 100 } });
    expect(reps.value).toEqual('100');

    fireEvent.click(getByTestId(/trash-exercise/i));

    expect(name.value).toEqual('');
    expect(weight.value).toEqual('');
    expect(sets.value).toEqual('');
    expect(reps.value).toEqual('');
  });

  test('submitted exercise renders on page', async () => {
    const { container, getByPlaceholderText, getByTestId, getByText } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    const name = getByPlaceholderText(/e.g. squat/i);
    const weight = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    fireEvent.change(name, { target: { value: 'test name' } });
    expect(name.value).toEqual('test name');
    fireEvent.change(weight, { target: { value: 100 } });
    expect(weight.value).toEqual('100');
    fireEvent.change(sets, { target: { value: 100 } });
    expect(sets.value).toEqual('100');
    fireEvent.change(reps, { target: { value: 100 } });
    expect(reps.value).toEqual('100');

    fireEvent.click(getByTestId(/submit-exercise/i));

    await wait(() => {
      expect(name.value).toEqual('');
      expect(weight.value).toEqual('');
      expect(sets.value).toEqual('');
      expect(reps.value).toEqual('');
      expect(container.contains(getByText(/test name/i))).toBeTruthy();
      expect(container.contains(getByText(/100 lbs/i))).toBeTruthy();
      expect(container.contains(getByText(/100 reps/i))).toBeTruthy();
      expect(container.contains(getByText(/100 sets/i))).toBeTruthy();
    });
  });

  test('exercise autosuggestion', async () => {
    const { store, getByPlaceholderText, queryByText, getByText } = wrapper(
      reducer,
      <WorkoutData />
    );

    store.dispatch({
      type: CREATE_EXERCISE,
      payload: { name: 'deadlift', _id: 1 }
    });

    expect(queryByText(/deadlift/i)).toBeFalsy();
    const name = getByPlaceholderText(/e.g. squat/i);
    await userEvent.type(name, 'd');
    name.focus();
    await wait(() => expect(getByText(/deadlift/i)).toBeTruthy());
  });
});

import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import ExerciseForm from 'src/components/dash/workoutmodal/ExerciseForm';
import { fireEvent, wait } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import { Editing } from 'src/types';

const editing = {} as Editing;
const setEditing = jest.fn();

describe('exercise form', () => {
  test('renders', () => {
    const { getByTestId } = wrapper(
      reducer,
      <ExerciseForm editing={editing} setEditing={setEditing} />
    );
    getByTestId(/exercise-form/i);
  });

  test('fields can be typed in', async () => {
    const { getByPlaceholderText } = wrapper(
      reducer,
      <ExerciseForm editing={editing} setEditing={setEditing} />
    );

    const name = getByPlaceholderText(/e.g. squat/i);
    const lbs = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    await act(async () => {
      await fireEvent.change(name, { target: { value: 'foo' } });
    });

    await act(async () => {
      await fireEvent.change(lbs, { target: { value: 1 } });
    });

    await act(async () => {
      await fireEvent.change(sets, { target: { value: 2 } });
    });

    await act(async () => {
      await fireEvent.change(reps, { target: { value: 3 } });
    });

    expect(name.getAttribute('value')).toBe('foo');
    expect(lbs.getAttribute('value')).toBe('1');
    expect(sets.getAttribute('value')).toBe('2');
    expect(reps.getAttribute('value')).toBe('3');
  });

  test('form validation', async () => {
    const { getByPlaceholderText, getByText } = wrapper(
      reducer,
      <ExerciseForm editing={editing} setEditing={setEditing} />
    );

    fireEvent.click(getByText(/add/i));

    await wait(() => expect(getByText(/enter name/i)).toBeTruthy());

    const lbs = getByPlaceholderText(/lbs/i);
    const sets = getByPlaceholderText(/# of sets/i);
    const reps = getByPlaceholderText(/# of reps/i);

    await act(async () => {
      await fireEvent.change(lbs, { target: { value: 10000000 } });
    });

    await act(async () => {
      await fireEvent.change(sets, { target: { value: 20000000 } });
    });

    await act(async () => {
      await fireEvent.change(reps, { target: { value: 300000000 } });
    });

    await wait(() => expect(getByText(/2000 lb limit/i)).toBeTruthy());
    await wait(() => expect(getByText(/2000 reps limit/i)).toBeTruthy());
    await wait(() => expect(getByText(/2000 sets limit/i)).toBeTruthy());
  });
});

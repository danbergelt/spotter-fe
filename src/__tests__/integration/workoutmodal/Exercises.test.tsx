import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Exercises from 'src/components/dash/workoutmodal/Exercises';
import { ADD_EXERCISE } from 'src/actions/workoutActions';
import { fireEvent, wait } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

const exercise = { name: 'foo', sets: '100', reps: '100', weight: '100' };

describe('exercises', () => {
  test('renders', () => {
    const { getByTestId, getByText, store } = wrapper(reducer, <Exercises />);
    store.dispatch({ type: ADD_EXERCISE, payload: exercise });
    getByTestId(/exercises/i);
    getByTestId(/exercise-form/i);
    getByText(/foo/i);
    getByText(/100 lbs/i);
    getByText(/100 reps/i);
    getByText(/100 sets/i);
  });

  test('delete exercise works', () => {
    const { queryByText, getByText, store } = wrapper(reducer, <Exercises />);
    store.dispatch({ type: ADD_EXERCISE, payload: exercise });
    expect(queryByText(/foo/i)).toBeTruthy();
    fireEvent.click(getByText(/delete/i));
    expect(queryByText(/foo/i)).toBeFalsy();
  });

  test('queue handler works', async () => {
    const { getByPlaceholderText, queryByText, getByText, store } = wrapper(
      reducer,
      <Exercises />
    );
    store.dispatch({ type: ADD_EXERCISE, payload: exercise });
    expect(getByPlaceholderText(/e.g. squat/i).getAttribute('value')).toBe('');
    expect(queryByText(/clear/i)).toBeFalsy();
    fireEvent.click(getByText(/edit/i));

    await wait(() =>
      expect(getByPlaceholderText(/e.g. squat/i).getAttribute('value')).toBe(
        'foo'
      )
    );

    fireEvent.click(getByText(/clear/i));

    await wait(() =>
      expect(getByPlaceholderText(/e.g. squat/i).getAttribute('value')).toBe('')
    );
  });

  test('can submit exercise', async () => {
    const { getByPlaceholderText, getByText } = wrapper(reducer, <Exercises />);

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

    fireEvent.click(getByText(/add/i));

    await wait(() => expect(getByText(/foo/i)).toBeTruthy());
    await wait(() => expect(getByText(/1 lbs/i)).toBeTruthy());
    await wait(() => expect(getByText(/2 sets/i)).toBeTruthy());
    await wait(() => expect(getByText(/3 reps/i)).toBeTruthy());
  });
});

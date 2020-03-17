import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Exercise from 'src/components/dash/workoutmodal/Exercise';

const exercise = { name: 'foo', sets: '100', reps: '100', weight: '100' };
const handleQueue = jest.fn();
const delExercise = jest.fn();

describe('exercise', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders', () => {
    const { getByText } = render(
      <Exercise
        i={0}
        exercise={exercise}
        handleQueue={handleQueue}
        delExercise={delExercise}
      />
    );

    getByText(/foo/i);
    getByText(/100 sets/i);
    getByText(/100 reps/i);
    getByText(/100 lbs/i);
  });

  test('delete exercise function calls', () => {
    const { getByText } = render(
      <Exercise
        i={0}
        exercise={exercise}
        handleQueue={handleQueue}
        delExercise={delExercise}
      />
    );

    fireEvent.click(getByText(/delete/i));
    expect(delExercise).toHaveBeenCalledTimes(1);
  });

  test('queue handler function calls', () => {
    const { getByText } = render(
      <Exercise
        i={0}
        exercise={exercise}
        handleQueue={handleQueue}
        delExercise={delExercise}
      />
    );

    fireEvent.click(getByText(/edit/i));
    expect(handleQueue).toHaveBeenCalledTimes(1);
  });
});

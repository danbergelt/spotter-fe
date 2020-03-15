import React, { useCallback } from 'react';
import { FiStar } from 'react-icons/fi';
import ExerciseForm from './data/exerciseform/ExerciseForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleQueueAction,
  delExerciseAction
} from '../../../actions/workoutActions';
import Exercise from './Exercise';
import { times } from 'lodash';
import { resetQueueAction } from '../../../actions/workoutActions';
import { State } from 'src/types/State';
import { Exercise as ExerciseType } from '../../../types/Exercises';
import { Action } from 'redux';

// container to hold all exercises on a workout

const Exercises: React.FC = () => {
  const exercises = useSelector(
    (state: State) => state.workoutReducer.exercises
  );

  // the app reads the queued state, and if it's not empty will render the clear button
  const queue = useSelector((state: State) => state.workoutReducer.queue);

  const dispatch = useDispatch();

  // refs to handle blurring fields on submit the form
  const refs: Array<React.RefObject<HTMLInputElement>> = [];
  times(3, i => (refs[i] = React.createRef()));

  // adds an exercise to the queue
  const handleQueue = useCallback(
    (exercise: ExerciseType, i: number): void => {
      dispatch(handleQueueAction(exercise, i));
    },
    [dispatch]
  );

  // deletes an exercise from the workout
  const delExercise = useCallback(
    (i: number): void => {
      dispatch(delExerciseAction(i));
    },
    [dispatch]
  );

  const clearFields = (): JSX.Element => {
    if (Object.keys(queue).length) {
      return (
        <div
          onClick={(): Action => dispatch(resetQueueAction())}
          className='workout-data-exercises-editing'
        >
          Clear
        </div>
      );
    }

    return <></>;
  };

  return (
    <section className='workout-data-exercises'>
      <header className='workout-data-exercises-head'>
        <FiStar className='workout-data-exercises-icon' />
        <div className='workout-data-exercises-title'>Workout</div>
        {clearFields()}
      </header>
      <section className='workout-data-exercises-content'>
        <ExerciseForm refs={refs} />
        <div className='workout-data-exercises-list'>
          {exercises.map((exercise, i) => (
            <Exercise
              key={i}
              i={i}
              exercise={exercise}
              handleQueue={handleQueue}
              delExercise={delExercise}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Exercises;

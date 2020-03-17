import React, { useCallback } from 'react';
import { FiStar } from 'react-icons/fi';
import ExerciseForm from './ExerciseForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleQueueAction,
  delExerciseAction
} from '../../../actions/workoutActions';
import Exercise from './Exercise';
import { resetQueueAction } from '../../../actions/workoutActions';
import { State } from 'src/types/State';
import { Exercise as ExerciseType } from '../../../types/Exercises';
import { Action } from 'redux';
import Flex from 'src/components/lib/Flex';
import styles from './Exercises.module.scss';

/*== Exercises =====================================================

The exercises section on the workout modal. Contains the exercise form,
and the list of all exercises on the current workout.

*/

const Exercises: React.FC = () => {
  // this workout/s list of exercises
  const exercises = useSelector(
    (state: State) => state.workoutReducer.exercises
  );

  // exercises that are queued to be edited
  const queue = useSelector((state: State) => state.workoutReducer.queue);

  // state dispatcher
  const dispatch = useDispatch();

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

  // if the queue contains an exercise, render a button to clear the queue
  const clearFields = (): JSX.Element => {
    if (Object.keys(queue).length) {
      return (
        <div
          onClick={(): Action => dispatch(resetQueueAction())}
          className={styles.clear}
        >
          Clear
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <Flex align='center' css={styles.head}>
        <FiStar className={styles.icon} />
        <div className={styles.title}>Workout</div>
        {clearFields()}
      </Flex>
      <section className={styles.container}>
        <ExerciseForm />
        <div className={styles.list}>
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
    </>
  );
};

export default Exercises;

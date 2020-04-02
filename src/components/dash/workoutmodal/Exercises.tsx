import React, { useCallback, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import ExerciseForm from './ExerciseForm';
import { useSelector, useDispatch } from 'react-redux';
import { delExerciseAction } from '../../../actions/workoutActions';
import Exercise from './Exercise';
import { State } from 'src/types';
import Flex from 'src/components/lib/Flex';
import styles from './Exercises.module.scss';
import { Editing } from 'src/types';

/*== Exercises =====================================================

The exercises section on the workout modal. Contains the exercise form,
and the list of all exercises on the current workout.

*/

const Exercises: React.FC = () => {
  // this workout/s list of exercises
  const exercises = useSelector(
    (state: State) => state.workoutReducer.exercises
  );

  // exercise editing state
  const [editing, setEditing] = useState<Editing>({} as Editing);

  // state dispatcher
  const dispatch = useDispatch();

  // deletes an exercise from the workout
  const delExercise = useCallback(
    (i: number): void => {
      setEditing({} as Editing);
      dispatch(delExerciseAction(i));
    },
    [dispatch]
  );

  return (
    <>
      <Flex testid='exercises' align='center' css={styles.head}>
        <FiStar className={styles.icon} />
        <div className={styles.title}>Workout</div>
        {!!Object.keys(editing).length && (
          <div
            className={styles.clear}
            onClick={(): void => setEditing({} as Editing)}
          >
            Clear
          </div>
        )}
      </Flex>
      <section className={styles.container}>
        <ExerciseForm setEditing={setEditing} editing={editing} />
        <div className={styles.list}>
          {exercises.map((exercise, i) => (
            <Exercise
              key={i}
              i={i}
              exercise={exercise}
              setEditing={setEditing}
              delExercise={delExercise}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Exercises;

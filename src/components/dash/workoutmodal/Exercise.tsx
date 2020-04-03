import React, { memo } from 'react';
import { Exercise as ExerciseType } from '../../../types/';
import Flex from 'src/components/lib/Flex';
import styles from './Exercise.module.scss';
import { useWindowSize } from 'react-use';
import { Editing } from 'src/types';

/*== Exercise =====================================================

This component is mapped into the exercises section in the workout modal
as an individual exercise. It includes the exercise name, the exercise
stats (sets, reps, weight) and actions to delete it from the modal or
load into the form and edit it

TO-DO --> reconsider the UI/UX for this. Right now it renders like a gray
blob at the bottom of the modal --> I think this can be improved!

Props:
  exercise: Exercise
    the exercise data
  i: number
    the exercise index. used to manage editing and deleting
  setEditing: react setStateAction
    stage an exercise for editing
  delExercise: function
    delete an exercise

*/

// a helper component that renders out an exercise stat
// either weight, sets, or reps
interface StatProps {
  stat: string;
}

const Stat: React.FC<StatProps> = ({ stat }) => {
  return <p className={styles.stat}>{stat}</p>;
};

interface Props {
  exercise: ExerciseType;
  i: number;
  setEditing: React.Dispatch<React.SetStateAction<Editing>>;
  delExercise: (i: number) => void;
}

const Exercise: React.FC<Props> = ({
  exercise,
  i,
  setEditing,
  delExercise
}) => {
  // width to adjust flex styling at different window sizes
  const { width } = useWindowSize();

  return (
    <Flex align='center' css={styles.row}>
      <Flex justify='space-between' align='flex-end' css={styles.stats}>
        <div className={styles.stretch}>
          <p className={styles.name}>{exercise.name}</p>
          <Flex
            justify='space-between'
            fd={width <= 500 ? 'column' : undefined}
            css={styles.spacer}
          >
            <Flex
              align={width <= 500 ? 'center' : undefined}
              css={styles.stats}
            >
              {exercise.weight && <Stat stat={`${exercise.weight} lbs`} />}
              {exercise.sets && <Stat stat={`${exercise.sets} sets`} />}
              {exercise.reps && <Stat stat={`${exercise.reps} reps`} />}
            </Flex>
            <Flex css={styles.actions}>
              <div
                onClick={(): void => delExercise(i)}
                className={styles.action}
              >
                Delete
              </div>
              <div
                onClick={(): void => setEditing({ exercise, i })}
                className={styles.action}
              >
                Edit
              </div>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
};

export default memo(Exercise);

import React, { memo } from 'react';
import { Props } from '../../../../../types/Exercises';

// either delete or edit an exercise

const ExerciseActions: React.FC<Props> = ({
  exercise,
  i,
  handleQueue,
  delExercise
}) => {
  return (
    <section className='exercise-actions'>
      <div
        role='button'
        data-testid='del-ex'
        onClick={(): void => delExercise(i)}
        className='exercise-edit'
      >
        Delete
      </div>
      <div
        role='button'
        onClick={(): void => handleQueue(exercise, i)}
        className='exercise-edit'
      >
        Edit
      </div>
    </section>
  );
};

export default memo(ExerciseActions);

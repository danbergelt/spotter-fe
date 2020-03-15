import React, { memo } from 'react';
import { Props } from '../../../types/Exercises';

// the rendered exercise, including all the exercise stats and ability to delete/edit

const Exercise: React.FC<Props> = ({
  exercise,
  i,
  handleQueue,
  delExercise
}) => {
  return (
    <div className={'exercise-row'}>
      <section className='exercise-results'>
        <div style={{ width: '100%' }}>
          <p className='exercise-name'>{exercise.name}</p>
          <div className='exercise-results-spacer'>
            <div className='exercise-stats'>
              {exercise.weight && (
                <p className='exercise-stat'>{exercise.weight} lbs</p>
              )}
              {exercise.sets && (
                <p className='exercise-stat'>{exercise.sets} sets</p>
              )}
              {exercise.reps && (
                <p className='exercise-stat'>{exercise.reps} reps</p>
              )}
            </div>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Exercise);

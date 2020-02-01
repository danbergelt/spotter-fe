import React, { memo } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import ExerciseActions from './ExerciseActions';
import { Props } from '../../../../../types/Exercises';

// the rendered exercise, including all the exercise stats and ability to delete/edit

const WorkoutExercise: React.FC<Props> = ({
  exercise,
  i,
  handleQueue,
  delExercise
}) => {
  return (
    exercise && (
      <div className={i % 2 === 0 ? 'exercise-row even' : 'exercise-row odd'}>
        <section className='exercise-results'>
          <div style={{ width: '100%' }}>
            <p className='exercise-name'>{exercise.name}</p>
            <div className='exercise-results-spacer'>
              <div className='exercise-stats'>
                {exercise.weight && (
                  <p className='exercise-stat'>{exercise.weight} lbs</p>
                )}
                {exercise.weight && exercise.reps && exercise.sets && (
                  <FiArrowRight />
                )}
                {exercise.sets && (
                  <p style={{ paddingLeft: '1rem' }} className='exercise-stat'>
                    {exercise.sets} sets
                  </p>
                )}
                {exercise.reps && exercise.sets && (
                  <div className='exercise-stat'>x</div>
                )}
                {exercise.reps && (
                  <p className='exercise-stat'>{exercise.reps} reps</p>
                )}
              </div>
              <ExerciseActions
                i={i}
                exercise={exercise}
                handleQueue={handleQueue}
                delExercise={delExercise}
              />
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default memo(WorkoutExercise);

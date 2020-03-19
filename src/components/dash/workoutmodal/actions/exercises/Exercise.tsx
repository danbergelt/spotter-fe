import React, { memo } from 'react';
import { FiX } from 'react-icons/fi';
import { Exercise as E } from '../../../../../types/ExerciseOption';

interface Props {
  deleteExercise: (id: string) => void;
  exercise: E;
}

const Exercise: React.FC<Props> = ({ deleteExercise, exercise }) => {
  return (
    <section className='exercise-container'>
      <p className='exercise'>{exercise.name}</p>
      <div
        role='button'
        onClick={(): void => deleteExercise && deleteExercise(exercise._id)}
        className='exercise-delete'
        data-testid='exercise-delete'
      >
        <FiX />
      </div>
    </section>
  );
};

export default memo(Exercise);

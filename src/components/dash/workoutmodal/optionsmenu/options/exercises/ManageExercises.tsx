import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Exercise from './Exercise';
import { deleteExerciseAction } from '../../../../../../actions/fetchExercisesActions';
import useToken from '../../../../../../hooks/useToken';
import { Exercise as E } from '../../../../../../types/ExerciseOption';

interface Props {
  exercises: Array<E>;
}

// search and delete exercises
// look into including the ability to rename an exercise in place

const ManageExercises: React.FC<Props> = ({ exercises }) => {
  const [search, setSearch] = useState<string>('');

  const token: string | null = useToken();
  const dispatch = useDispatch();

  // search filter function
  const filter: Array<E> = exercises.filter((e: E) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteExercise = useCallback(
    (id: string) => {
      dispatch(deleteExerciseAction(token, id));
    },
    [dispatch, token]
  );

  return (
    <>
      <div>
        <input
          value={search}
          onChange={(e): void => setSearch(e.target.value)}
          placeholder='Search exercises...'
          className='exercises-add'
        />
      </div>
      {exercises.length && filter.length ? (
        <section className='exercises'>
          {filter.map((exercise: E) => (
            <Exercise
              key={exercise._id}
              deleteExercise={deleteExercise}
              exercise={exercise}
            />
          ))}
        </section>
      ) : (
        <p
          style={{ fontSize: '1.3rem', textAlign: 'center', marginTop: '1rem' }}
        >
          No exercises found
        </p>
      )}
    </>
  );
};

export default ManageExercises;

import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Exercise from './Exercise';
import { deleteExerciseAction } from '../../../../../actions/fetchExercisesActions';
import useToken from '../../../../../hooks/useToken';
import { Exercise as E } from '../../../../../types/ExerciseOption';
import useApi from 'src/hooks/useApi';
import { deleteExerciseQuery } from 'src/utils/queries';

interface Props {
  exercises: Array<E>;
}

// search and delete exercises
// look into including the ability to rename an exercise in place

const ManageExercises: React.FC<Props> = ({ exercises }) => {
  const [search, setSearch] = useState<string>('');

  const token: string | null = useToken();
  const dispatch = useDispatch();
  const [res, call] = useApi();

  // search filter function
  const filter: Array<E> = exercises.filter((e: E) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (res.data) {
      dispatch(deleteExerciseAction(res.data.exercise._id));
    }

    if (res.error) {
      // handle later
    }
  }, [res, dispatch]);

  const deleteExercise = useCallback(
    async (id: string) => {
      await call(deleteExerciseQuery, [token, id]);
    },
    [token, call]
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

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteExerciseAction } from '../../../../../actions/fetchExercisesActions';
import useToken from '../../../../../hooks/useToken';
import { Exercise } from '../../../../../types/ExerciseOption';
import useApi from 'src/hooks/useApi';
import { deleteExerciseQuery } from 'src/utils/queries';
import Input from 'src/components/lib/Input';
import { FiX } from 'react-icons/fi';
import styles from './Manage.module.scss';
import Flex from 'src/components/lib/Flex';

interface Props {
  exercises: Array<Exercise>;
}

// search and delete exercises
// look into including the ability to rename an exercise in place

const Manage: React.FC<Props> = ({ exercises }) => {
  const [search, setSearch] = useState<string>('');

  const token: string | null = useToken();
  const dispatch = useDispatch();
  const [res, call] = useApi();

  // search filter function
  const filter = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (res.data) {
      dispatch(deleteExerciseAction(res.data.exercise._id));
    }

    if (res.error) {
      // handle later
    }
  }, [res, dispatch]);

  const deleteExercise = async (id: string): Promise<void> => {
    await call(deleteExerciseQuery, [token, id]);
  };

  const renderExercises = (): JSX.Element => {
    if (exercises.length && filter.length) {
      return (
        <section className={styles.exercises}>
          {filter.map(exercise => (
            <Flex justify='space-between' align='center' key={exercise._id}>
              <p className={styles.exercise}>{exercise.name}</p>
              <FiX
                onClick={(): Promise<void> => deleteExercise(exercise._id)}
                className={styles.delete}
                data-testid='exercise-delete'
              />
            </Flex>
          ))}
        </section>
      );
    }

    return <p className={styles.empty}>No exercises found</p>;
  };

  return (
    <>
      <Input
        value={search}
        onChange={(e): void => setSearch(e.target.value)}
        placeholder='Search exercises...'
        type='text'
        name='search'
        css={styles.input}
      />
      {renderExercises()}
    </>
  );
};

export default Manage;

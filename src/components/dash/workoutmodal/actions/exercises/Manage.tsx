import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useToken from '../../../../../hooks/useToken';
import { Exercise } from '../../../../../types/ExerciseOption';
import useApi from 'src/hooks/useApi';
import { deleteExerciseQuery } from 'src/utils/queries';
import Input from 'src/components/lib/Input';
import { FiX } from 'react-icons/fi';
import styles from './Manage.module.scss';
import Flex from 'src/components/lib/Flex';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import produce from 'immer';
import { remove } from 'lodash';

/*== Manage exercises =====================================================

Manage exercises, either by deleting them or searching them to see what 
exercises you have saved.

TODO --> separating this form from the PRs/stats page is unintuitive,
and has been a source of confusion. Look into moving this functionality to
the PR's page, so that users can add exercises to track and view tracked
exercises in one place instead of having to go back and forth. Also,
this functionality is not clear ('why does this exist') unless a user knows
about how the PR's are tracked.

TODO --> Look into the ability to rename exercises in place

Props:
  exercises: Array<Exercise>
    All exercises for this user

*/

interface Props {
  exercises: Array<Exercise>;
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const Manage: React.FC<Props> = ({ exercises, setExercises }) => {
  // search filter
  const [search, setSearch] = useState('');

  // auth token
  const token = useToken();

  // state dispatcher
  const dispatch = useDispatch();

  // api utils
  const [res, call, reset] = useApi();

  // filter exercises by search input
  const filter = exercises.filter(exercise => {
    return exercise.name.toLowerCase().includes(search.toLowerCase());
  });

  // delete an exercise from app state on successful delete query
  useEffect(() => {
    if (res.data) {
      setExercises(s =>
        produce(s, draft => {
          remove(draft, exercise => exercise._id === res.data.exercise._id);
        })
      );
    }
  }, [res, dispatch]);

  // delete an exercise from the this user's account
  const deleteExercise = async (id: string): Promise<void> => {
    await call(deleteExerciseQuery, [token, id]);
  };

  // if this user has exercises, map them into the component
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

    // otherwise, render a message that there are no exercises for this user
    return <p className={styles.empty}>No exercises found</p>;
  };

  return (
    <>
      <Input
        value={search}
        onChange={(e): void => setSearch(e.target.value)}
        placeholder='Search exercises'
        type='text'
        name='search'
        css={styles.input}
      />
      <HTTPResponse reset={reset} css={styles.err} error={res.error} />
      {renderExercises()}
    </>
  );
};

export default Manage;

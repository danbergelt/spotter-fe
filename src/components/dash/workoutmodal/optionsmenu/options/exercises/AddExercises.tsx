import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createExerciseAction } from '../../../../../../actions/fetchExercisesActions';
import SaveExerciseMsg from './SaveExerciseMsg';
import useToken from '../../../../../../hooks/useToken';
import { Msg } from '../../../../../../types/ExerciseOption';
import useApi from 'src/hooks/useApi';
import { createExerciseQuery } from 'src/utils/queries';

// create exercise

interface Props {
  msg: Msg;
  setMsg: React.Dispatch<React.SetStateAction<Msg>>;
}

// save a new exercise
// saved exercises can be used to track PRs

const AddExercises: React.FC<Props> = ({ msg, setMsg }) => {
  const [exercise, setExercise] = useState<string>('');

  const token: string | null = useToken();
  const dispatch = useDispatch();
  const [res, call] = useApi();

  useEffect(() => {
    if (res.data) {
      setExercise('');
      dispatch(createExerciseAction(res.data.exercise));
      setMsg({ success: 'Tag created' });
    }

    if (res.error) {
      setMsg({ error: res.error });
    }
  }, [res, dispatch, setExercise]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await call(createExerciseQuery, [token, exercise]);
  };

  return (
    <>
      <form
        onSubmit={(e): Promise<void> => handleSubmit(e)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <input
          value={exercise}
          onChange={(e): void => setExercise(e.target.value)}
          placeholder='Create exercise...'
          className='exercises-add'
        />
        <button data-testid='create-exercise' className='btn-exercise'>
          Create
        </button>
      </form>
      {msg.error && (
        <SaveExerciseMsg
          errOrSucc={'exercise-save error'}
          msg={msg.error}
          setMsg={setMsg}
        />
      )}
      {msg.success && (
        <SaveExerciseMsg
          errOrSucc={'exercise-save success'}
          msg={msg.success}
          setMsg={setMsg}
        />
      )}
    </>
  );
};

export default AddExercises;

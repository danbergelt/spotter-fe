import React, { memo, useEffect } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import {
  editWorkoutAction,
  createWorkoutAction
} from '../../../../../../actions/optionsActions';
import { State, WorkoutReducer } from 'src/types/State';
import useApi from 'src/hooks/useApi';
import { saveWorkoutQuery, editWorkoutQuery } from 'src/utils/queries';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import styles from './SaveWorkout.module.scss';

interface Props {
  workoutId: string | null;
  closeParentModal: () => void;
}

// Save or Edit workout depending on global modal context
const SaveWorkout: React.FC<Props> = ({ workoutId, closeParentModal }) => {
  const workout: WorkoutReducer = useSelector(
    (state: State) => state.workoutReducer
  );
  const { date, t, ctx } = useSelector((state: State) => state.globalReducer);
  const dispatch = useDispatch();
  const [res, call, reset] = useApi();

  // handle successful api call
  useEffect(() => {
    if (res.data) {
      // if the ctx is add, push the returned workout to the list of workouts
      if (ctx === 'add') {
        dispatch(createWorkoutAction(res.data.workout));
        closeParentModal();
      }

      // if the ctx is view, replace the workout with the returned workout
      if (ctx === 'view') {
        dispatch(editWorkoutAction(res.data.workout));
        closeParentModal();
      }
    }
  }, [res, closeParentModal, ctx, dispatch]);

  // save/edit a workout
  const saveHandler = async (): Promise<void> => {
    // if user is adding a new workout
    if (ctx === 'add') {
      await call(saveWorkoutQuery, [t, date, workout]);
    }

    // if user is editing a saved workout
    if (ctx === 'view') {
      await call(editWorkoutQuery, [t, workoutId, workout]);
    }
  };

  return (
    <>
      <div
        role='button'
        data-testid='save-workout'
        onClick={saveHandler}
        className={styles.save}
      >
        <FiPlusCircle className={styles.icon} />
        {ctx === 'add' ? 'Save' : 'Update'}
      </div>
      <HTTPResponse reset={reset} error={res.error} />
    </>
  );
};

export default memo(SaveWorkout);

import React, { memo, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import {
  editWorkoutAction,
  createWorkoutAction
} from '../../../../../../actions/optionsActions';
import { State, WorkoutReducer } from 'src/types/State';
import { Moment } from 'moment';
import useApi from 'src/hooks/useApi';
import { saveWorkoutQuery, editWorkoutQuery } from 'src/utils/queries';

interface Props {
  workoutId: string | null;
  closeParentModal: () => void;
  ctx: string | null;
  iconClass: string;
}

interface GlobalReducer {
  date: null | Moment;
  t: string | null;
}

// Save or Edit workout depending on global modal context
const SaveWorkout: React.FC<Props> = ({
  workoutId,
  closeParentModal,
  ctx,
  iconClass
}) => {
  const [error, setError] = useState('');
  const workout: WorkoutReducer = useSelector(
    (state: State) => state.workoutReducer
  );
  const { date, t }: GlobalReducer = useSelector(
    (state: State) => state.globalReducer
  );
  const dispatch = useDispatch();
  const [res, call] = useApi();

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

    if (res.error) {
      setError(res.error);
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
        className='add-workout-options-button publish'
      >
        <FiPlusCircle className={iconClass} />
        {ctx === 'add' ? 'Save' : 'Update'}
      </div>
      {error && <div className='save error'>{error}</div>}
    </>
  );
};

export default memo(SaveWorkout);

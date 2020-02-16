import React, { memo } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import {
  saveWorkoutAction,
  editWorkoutAction
} from '../../../../../../actions/optionsActions';
import { useHistory } from 'react-router-dom';
import reFetch from '../../../../../../utils/reFetch';
import { State, WorkoutReducer } from 'src/types/State';
import { Moment } from 'moment';

interface Props {
  workoutId: string | null;
  time: number;
  closeParentModal: () => void;
  ctx: string | null;
  iconClass: string;
}

interface GlobalReducer {
  date: null | Moment;
  scope: { value: string; label: string };
  t: string | null;
}

// Save or Edit workout depending on global modal context
const SaveWorkout: React.FC<Props> = ({
  workoutId,
  time,
  closeParentModal,
  ctx,
  iconClass
}) => {
  const saveMsg: Partial<{ error: string }> = useSelector(
    (state: State) => state.optionsReducer.saveMsg
  );
  const workout: WorkoutReducer = useSelector(
    (state: State) => state.workoutReducer
  );
  const { date, scope, t }: GlobalReducer = useSelector(
    (state: State) => state.globalReducer
  );

  const dispatch = useDispatch();
  const history = useHistory();

  // builds an object to clean up passing 5+ params to the workout dispatchers
  const paramsHelper = {
    t,
    workout,
    closeParentModal,
    time,
    scope,
    history,
    reFetch,
    date,
    workoutId
  };

  const saveHandler: () => void = () => {
    // if user is adding a new workout
    if (ctx === 'add') {
      dispatch(saveWorkoutAction(paramsHelper));
    }

    // if user is editing a saved workout
    if (ctx === 'view') {
      dispatch(editWorkoutAction(paramsHelper));
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
      {saveMsg.error && <div className='save error'>{saveMsg.error}</div>}
    </>
  );
};

export default memo(SaveWorkout);

import React, { useState, useCallback, useEffect } from 'react';
import { generateMonth, monthDashHead } from '../../../../utils/momentUtils';
import DashControls from '../DashControls';
import GridDay from './GridDay';
import { useSelector, useDispatch } from 'react-redux';
import {
  incOrDecAction,
  addWorkoutModalAction,
  viewWorkoutModalAction
} from '../../../../actions/globalActions';
import WorkoutModal from '../../workoutmodal/WorkoutModal';
import { useHistory } from 'react-router-dom';
import reFetch from '../../../../utils/reFetch';
import { fetchExercises } from '../../../../actions/fetchExercisesActions';
import { State } from 'src/types/State';
import { Workout } from 'src/types/Workout';
import { Moment } from 'moment';
import { closeWorkoutModalAction } from 'src/actions/globalActions';

interface GlobalReducer {
  scope: { value: string; label: string };
  t: string | null;
  timeSpan: number;
}

const WorkoutGrid: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [modal, setModal] = useState<boolean>(false);

  // need to pass an id to control that each day has its own popover
  const [popover, setPopover] = useState<{ open: boolean; id: null | string }>({
    open: false,
    id: null
  });

  const workouts: Array<Workout> = useSelector(
    (state: State) => state.fetchWorkoutsReducer.workouts
  );
  const { scope, t, timeSpan }: GlobalReducer = useSelector(
    (state: State) => state.globalReducer
  );

  // fetches up-to-date list of workouts on re-render
  useEffect(() => {
    reFetch(timeSpan, history, scope.value, t);
  }, [timeSpan, history, scope.value, t]);

  // increment or decrement by one week/month at a time
  const inc = (): void => {
    dispatch(incOrDecAction('inc', timeSpan));
  };
  const dec = (): void => {
    dispatch(incOrDecAction('dec', timeSpan));
  };

  // opens modal to add a new workout
  const paramsHelper = { setModal, fetchExercises, t, history };
  const openAddWorkoutModal: (date: Moment) => void = useCallback(
    date => {
      dispatch(addWorkoutModalAction({ ...paramsHelper, date }));
    },
    [dispatch, paramsHelper]
  );
  // opens modal to view a saved workout
  const openViewModal: (workout: Workout, date: Moment) => void = useCallback(
    (workout, date) => {
      dispatch(viewWorkoutModalAction({ ...paramsHelper, date, workout }));
    },
    [dispatch, paramsHelper]
  );
  // resets state in various parts of application upon workout modal close
  const closeModal: () => void = useCallback(() => {
    setModal(false);
    dispatch(closeWorkoutModalAction());
  }, [dispatch]);

  return (
    <div className='spacer'>
      <DashControls inc={inc} dec={dec} time={timeSpan} month={monthDashHead} />
      <section className='month-workout-days'>
        {generateMonth(timeSpan).map((date, i) => (
          <GridDay
            openAddWorkoutModal={openAddWorkoutModal}
            openViewModal={openViewModal}
            key={date.format('MMM DD YYYY')}
            date={date}
            i={i}
            workouts={workouts}
            popover={popover}
            setPopover={setPopover}
          />
        ))}
        <WorkoutModal time={timeSpan} modal={modal} closeModal={closeModal} />
      </section>
    </div>
  );
};

export default WorkoutGrid;

import React, { useState, useEffect, useCallback } from 'react';
import WorkoutColumn from './WorkoutColumn';
import WorkoutModal from '../../workoutmodal/WorkoutModal';
import { generateWeek, dashHead } from '../../../../utils/momentUtils';
import DashControls from '../DashControls';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  incOrDecAction,
  addWorkoutModalAction,
  viewWorkoutModalAction
} from '../../../../actions/globalActions';
import { State } from 'src/types/State';
import { Workout } from 'src/types/Workout';
import { Moment } from 'moment';
import { closeWorkoutModalAction } from 'src/actions/globalActions';
import { fetchWorkoutsQuery } from 'src/utils/queries';
import useApi from 'src/hooks/useApi';
import { fetchWorkoutsAction } from 'src/actions/fetchWorkoutsActions';

interface GlobalReducer {
  scope: { value: string; label: string };
  t: string | null;
  timeSpan: number;
}

const WorkoutColumns: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [res, call] = useApi();

  const workouts: Array<Workout> = useSelector(
    (state: State) => state.fetchWorkoutsReducer.workouts
  );
  const { scope, t, timeSpan }: GlobalReducer = useSelector(
    (state: State) => state.globalReducer
  );

  useEffect(() => {
    if (res.data) {
      dispatch(fetchWorkoutsAction(res.data.workouts));
    }

    if (res.error) {
      // handle later
    }
  }, [res, dispatch, history]);

  // increment or decrement by one week/day at a time
  const inc = (): void => {
    dispatch(incOrDecAction('inc', timeSpan));
  };
  const dec = (): void => {
    dispatch(incOrDecAction('dec', timeSpan));
  };

  // fetch workouts
  useEffect(() => {
    if (t) {
      call(fetchWorkoutsQuery, [t, timeSpan, scope.value]);
    }
  }, [timeSpan, scope.value, t, dispatch, call]);

  // opens modal to add a new workout
  const paramsHelper = { setModal, t, history };
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
      <DashControls inc={inc} dec={dec} time={timeSpan} month={dashHead} />
      <section className='week-workouts-days'>
        {generateWeek(timeSpan).map((date, i) => (
          <WorkoutColumn
            date={date}
            key={i}
            i={i}
            openAddWorkoutModal={openAddWorkoutModal}
            openViewModal={openViewModal}
            workouts={workouts}
          />
        ))}
      </section>
      <WorkoutModal time={timeSpan} modal={modal} closeModal={closeModal} />
    </div>
  );
};

export default WorkoutColumns;

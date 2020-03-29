import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openWorkoutModalAction,
  closeWorkoutModalAction
} from '../actions/globalActions';
import { Workout } from 'src/types/Workout';
import { Moment } from 'moment';
import { State } from 'src/types/State';
import useApi from 'src/hooks/useApi';
import { fetchWorkoutsAction } from 'src/actions/fetchWorkoutsActions';
import { fetchWorkoutsQuery } from 'src/utils/queries';
import Controls from '../components/dash/controls/Controls';
import {
  setHead,
  generateWeek,
  generateMonth,
  momentHelpers
} from 'src/utils/momentUtils';
import Column from '../components/dash/views/week/Column';
import WorkoutModal from '../components/dash/workoutmodal/WorkoutModal';
import Cell from '../components/dash/views/month/Cell';
import { Scope, Ctx } from 'src/types/Types';
import SubNav from '../components/dash/subnav/SubNav';
import { Helmet } from 'react-helmet-async';
import styles from './Dashboard.module.scss';
import useToken from 'src/hooks/useToken';

/*== Dashboard =====================================================

This page is the main dashboard view for a user once they log in.

It includes two views: a monthly view, which has up to 31 days of 
workouts, and a weekly view, which has up to 7 days of workouts.
The use can toggle between these views using the <SubNav />
component

The use can also go forward or back in time as far as they want
using the <Controls /> component. The Subnav, the Controls,
the Helmet (for SEO), and the Workout modal are all included
in a <Wrapper /> component that sits around the weekly view
and monthly view.

*/

const Dashboard: React.FC = () => {
  // standardized date format
  const { FORMAT_FULL } = momentHelpers;

  // state dispatcher
  const dispatch = useDispatch();

  // workout modal state
  const [modal, setModal] = useState(false);

  // api utils
  const [res, call] = useApi();

  // list of workouts
  const workouts = useSelector(
    (state: State) => state.fetchWorkoutsReducer.workouts
  );

  // auth token
  const token = useToken();

  // global utils: scope (month or week), auth token, and current timespan
  const { scope, timeSpan } = useSelector(
    (state: State) => state.globalReducer
  );

  // if fetch workouts call is successful, dispatch to store
  useEffect(() => {
    if (res.data) {
      dispatch(fetchWorkoutsAction(res.data.workouts));
    }

    if (res.error) {
      // TODO --> handle errors for failed workout fetches
    }
  }, [res, dispatch]);

  // fetch workouts call
  useEffect(() => {
    call(fetchWorkoutsQuery, [token, timeSpan, scope]);
  }, [timeSpan, scope, token, dispatch, call]);

  // open the workout modal in either an add workout context, or view workout context
  const openModal = useCallback(
    (date: Moment, ctx: Ctx, workout?: Workout): void => {
      dispatch(openWorkoutModalAction(date, ctx, workout));
      setModal(true);
    },
    [dispatch, setModal]
  );

  // resets state in various parts of application upon workout modal close
  const closeModal = useCallback(() => {
    setModal(false);
    dispatch(closeWorkoutModalAction());
  }, [dispatch]);

  // wrapper for both weekly and monthly view
  interface Props {
    scope: Scope;
  }

  const Wrapper: React.FC<Props> = ({ children, scope }) => {
    return (
      <>
        {/* SEO */}
        <Helmet>
          <title>Dashboard | Spotter</title>
        </Helmet>
        {/* toggle month/week view */}
        <SubNav />
        <div className={styles.container}>
          {/* PR's link and go back/forth in time */}
          <Controls time={timeSpan} setHead={setHead} scope={scope} />
          {children}
          <WorkoutModal modal={modal} closeModal={closeModal} />
        </div>
      </>
    );
  };

  // filter a list of workouts by a passed-in date
  const filterWorkouts = (workouts: Workout[], date: Moment): Workout[] => {
    return workouts.filter(
      workout => workout.date === date.format(FORMAT_FULL)
    );
  };

  // if the scope is week, generate the columns view
  if (scope === 'week') {
    return (
      <Wrapper scope={scope}>
        <section data-testid='cols' className={styles.week}>
          {generateWeek(timeSpan).map(date => (
            <Column
              date={date}
              key={date.format(FORMAT_FULL)}
              openModal={openModal}
              workouts={filterWorkouts(workouts, date)}
            />
          ))}
        </section>
      </Wrapper>
    );
  }

  // month view
  return (
    <Wrapper scope={scope}>
      <section data-testid='grid' className={styles.month}>
        {generateMonth(timeSpan).map((date, i) => (
          <Cell
            openModal={openModal}
            key={date.format(FORMAT_FULL)}
            date={date}
            cell={i}
            workouts={filterWorkouts(workouts, date)}
          />
        ))}
      </section>
    </Wrapper>
  );
};

export default Dashboard;

import React from 'react';

import SubNav from '../components/dash/subnav/SubNav';
import WorkoutColumns from '../components/dash/workouts/week/WorkoutColumns';
import WorkoutGrid from '../components/dash/workouts/month/WorkoutGrid';
import { useSelector } from 'react-redux';
import { State } from 'src/types/State';
import { Helmet } from 'react-helmet-async';

const Dashboard: React.FC = () => {
  const scope = useSelector((state: State) => state.globalReducer.scope);

  return (
    <>
      <Helmet>
        <title>Dashboard | Spotter</title>
      </Helmet>
      <SubNav />
      {scope === 'Week' && <WorkoutColumns />}
      {scope === 'Month' && <WorkoutGrid />}
    </>
  );
};

export default Dashboard;

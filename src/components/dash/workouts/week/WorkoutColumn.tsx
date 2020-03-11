import React, { memo } from 'react';
import WorkoutColumnContent from './WorkoutColumnContent';

import WorkoutCard from './WorkoutCard';
import { Moment } from 'moment';
import { Workout } from 'src/types/Workout';

interface Props {
  date: Moment;
  i: number;
  openAddWorkoutModal: (date: Moment) => void;
  openViewModal: (workout: Workout, date: Moment) => void;
  workouts: Array<Workout>;
}

const WorkoutColumn: React.FC<Props> = ({
  date,
  i,
  openAddWorkoutModal,
  openViewModal,
  workouts
}) => {
  return (
    <div role='button' className='week-workouts-column'>
      <WorkoutColumnContent
        date={date}
        i={i}
        openAddWorkoutModal={(): void => openAddWorkoutModal(date)}
      />
      <div>
        {/* filter workouts for workouts matching this date */}
        {workouts
          .filter(el => el.date === date.format('MMM DD YYYY'))
          .map(workout => (
            <div
              className='workout-card-container'
              onClick={(): void => openViewModal(workout, date)}
              key={workout._id}
              role='button'
            >
              <WorkoutCard workout={workout} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(WorkoutColumn);

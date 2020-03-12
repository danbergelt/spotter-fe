import React, { memo } from 'react';
import WorkoutColumnContent from './WorkoutColumnContent';

import WorkoutCard from './WorkoutCard';
import { Moment } from 'moment';
import { Workout } from 'src/types/Workout';

interface Props {
  date: Moment;
  i: number;
  openModal: Function;
  workouts: Array<Workout>;
}

const WorkoutColumn: React.FC<Props> = ({ date, i, openModal, workouts }) => {
  return (
    <div role='button' className='week-workouts-column'>
      <WorkoutColumnContent date={date} i={i} openModal={openModal} />
      <div>
        {/* filter workouts for workouts matching this date */}
        {workouts
          .filter(el => el.date === date.format('MMM DD YYYY'))
          .map(workout => (
            <div
              className='workout-card-container'
              onClick={(): void => openModal(date, 'view', workout)}
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

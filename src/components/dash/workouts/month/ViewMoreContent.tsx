import React, { memo } from 'react';
import { FiX } from 'react-icons/fi';
import { P } from 'src/types/Grid';
import { Workout } from 'src/types/Workout';
import * as M from 'moment';

// Hacky fix to resolve error with default imports from moment and typescript
// eslint-disable-next-line
let m = require('moment');
if ('default' in m) {
  m = m['default'];
}

interface Props {
  setPopover: React.Dispatch<React.SetStateAction<P>>;
  workouts: Array<Workout>;
  openModal: Function;
  date: M.Moment;
}

// content container in the popover (which holds workouts when there are more than one on a day)

const ViewMoreContent: React.FC<Props> = ({
  setPopover,
  workouts,
  openModal,
  date
}) => {
  // closes the popover when a workout is selected
  const handlePopover: (workout: Workout, date: M.Moment) => void = workout => {
    setPopover({ open: false, id: null });
    openModal(date, 'view', workout);
  };

  return (
    <>
      <div className='popover-head'>
        {date.format('MMM D')}
        <div
          role='button'
          data-testid='close-popover'
          onClick={(): void => setPopover({ open: false, id: null })}
          className='close-popover'
        >
          <FiX />
        </div>
      </div>
      {workouts
        .filter(el => el.date === date.format('MMM DD YYYY'))
        .map(workout => (
          <div
            onClick={(): void =>
              handlePopover(workout, m(workout.date, 'MMM DD YYYY'))
            }
            role='button'
            className='view-more-workouts-container'
            key={workout._id}
          >
            <p
              style={{ background: workout.tags[0] && workout.tags[0].color }}
              className='view-more-workout'
            >
              {workout.title}
            </p>
          </div>
        ))}
    </>
  );
};

export default memo(ViewMoreContent);

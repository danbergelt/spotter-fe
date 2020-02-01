import React, { memo } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Moment } from 'moment';
import { useWindowSize } from 'react-use';

// includes the add workout button and date details (e.g. --> day of week, month, etc.)

interface Props {
  date: Moment;
  openAddWorkoutModal: (date: Moment) => void;
  i: number;
}

const WorkoutColumnContent: React.FC<Props> = ({
  date,
  openAddWorkoutModal,
  i
}) => {
  const { width } = useWindowSize();

  const dynamicContentHelper = (): string | null => {
    if (width <= 500) {
      return null;
    } else if (width < 800) {
      return 'Add';
    } else {
      return 'Add Workout';
    }
  };

  return (
    <>
      <section
        className='week-workouts-day'
        data-testid={date.format('MMM DD YYYY')}
      >
        <p className='week-workout-day-slug'>{date.format('ddd')}</p>
        <p className='week-workout-day-date'>{date.format('D')}</p>
      </section>
      <div
        data-testid={i === 0 && 'modal-click'}
        onClick={(): void => openAddWorkoutModal(date)}
        className='week-workouts-add-workout'
        role='button'
      >
        {<FiPlusCircle className='week-workouts-add-icon' />}{' '}
        {dynamicContentHelper()}
      </div>
    </>
  );
};

export default memo(WorkoutColumnContent);

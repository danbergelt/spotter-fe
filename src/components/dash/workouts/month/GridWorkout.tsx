import React, { memo } from 'react';
import { Workout } from 'src/types/Workout';
import { Moment } from 'moment';
import { useWindowSize } from 'react-use';

interface Props {
  data: Workout;
  openModal: Function;
  date: Moment;
}

// prompt to view a pre-existing workout

const GridWorkout: React.FC<Props> = ({ data, openModal, date }) => {
  const { width }: { width: number } = useWindowSize();

  return (
    <div
      style={{ background: data.tags[0] && data.tags[0].color }}
      className='month-grid-workout'
      role='button'
      onClick={(): void => openModal(date, 'view', data)}
      key={data._id}
    >
      {width <= 800 && data.title.length > 5
        ? `${data.title.slice(0, 4)}...`
        : data.title}
    </div>
  );
};

export default memo(GridWorkout);

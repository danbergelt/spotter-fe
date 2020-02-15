import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useWindowSize } from 'react-use';
import { Link } from 'react-router-dom';

interface Props {
  inc: () => void;
  dec: () => void;
  time: number;
  month: (num: number) => string;
}

// controls incrementing/decrementing the date in view

const DashControls: React.FC<Props> = ({ inc, dec, time, month }) => {
  const { width } = useWindowSize();

  return (
    <div className='controls-spacer'>
      <section className='workouts-head'>
        <div className='workouts-icons'>
          <FiChevronLeft
            style={{ fontSize: width > 800 ? '2.75rem' : '2.25rem' }}
            data-testid='back'
            onClick={dec}
            className='workouts-head-icon'
          />
          <FiChevronRight
            style={{ fontSize: width > 800 ? '2.75rem' : '2.25rem' }}
            data-testid='forward'
            onClick={inc}
            className='workouts-head-icon'
          />
        </div>
        <div className='workouts-month-indicator'>{month(time)}</div>
      </section>
      <Link to='/prs' className='prs-link'>
        PRs
      </Link>
    </div>
  );
};

export default DashControls;

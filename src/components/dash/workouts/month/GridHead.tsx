import React, { memo } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Moment } from 'moment';
import { useWindowSize } from 'react-use';

// Hacky fix to resolve error with default imports from moment and typescript
// eslint-disable-next-line
let m = require('moment');
if ('default' in m) {
  m = m['default'];
}

interface Props {
  openModal: Function;
  date: Moment;
}

// includes the button to add a new workout

const GridHead: React.FC<Props> = ({ openModal, date }) => {
  const { width }: { width: number } = useWindowSize();

  return (
    <>
      <section className='month-grid-day-head'>
        <div
          role='button'
          onClick={(): void => openModal(date, 'add')}
          style={{ marginLeft: 'auto' }}
          className='month-grid-add-workout'
        >
          <FiPlusCircle />
        </div>
      </section>
      <p
        style={{ fontSize: width <= 800 ? '1.1rem' : '1.3rem' }}
        className={
          date.format('MMM DD YYYY') === m().format('MMM DD YYYY')
            ? 'today-date'
            : undefined
        }
      >
        {date.format('D')}
      </p>
    </>
  );
};

export default memo(GridHead);

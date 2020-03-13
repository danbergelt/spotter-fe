import React, { memo } from 'react';
import moment, { Moment } from 'moment';
import GridWorkout from './GridWorkout';
import Popover from './PopoverContainer';
import { Workout } from 'src/types/Workout';
import { P } from 'src/types/Grid';
import { useWindowSize } from 'react-use';
import { FiPlusCircle } from 'react-icons/fi';

interface Props {
  date: Moment;
  i: number;
  openModal: Function;
  workouts: Array<Workout>;
  popover: P;
  setPopover: React.Dispatch<React.SetStateAction<P>>;
}

// an individual day in the 30 day+ workout grid

const GridDay: React.FC<Props> = ({
  date,
  i,
  openModal,
  workouts,
  popover,
  setPopover
}) => {
  const { width }: { width: number } = useWindowSize();

  return (
    <section
      className='month-grid-day'
      data-testid={date.format('MMM DD YYYY')}
    >
      <section className='month-grid-day-head'>
        {i <= 6 && (
          <p className='month-grid-day-of-week'>{date.format('ddd')}</p>
        )}
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
          date.format('MMM DD YYYY') === moment().format('MMM DD YYYY')
            ? 'today-date'
            : undefined
        }
      >
        {date.format('D')}
      </p>
      {workouts
        // if the workout matches this day's date, map over it and render it out into the day
        .filter(el => el.date === date.format('MMM DD YYYY'))
        .map(
          (data, i) =>
            i === 0 && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                key={data._id}
              >
                <GridWorkout data={data} openModal={openModal} date={date} />
                {workouts.filter(el => el.date === date.format('MMM DD YYYY'))
                  .length > 1 && (
                  // if there is more than one workout in a day, render a popover to control overflow
                  <Popover
                    workouts={workouts}
                    popover={popover}
                    setPopover={setPopover}
                    openModal={openModal}
                    date={date}
                  >
                    <div
                      onClick={(): void =>
                        setPopover({
                          open: true,
                          id: date.format('MMM DD YYYY')
                        })
                      }
                      role='button'
                      className='grid-view-more'
                    >
                      {width <= 500 ? 'More' : 'View More'}
                    </div>
                  </Popover>
                )}
              </div>
            )
        )}
    </section>
  );
};

export default memo(GridDay);

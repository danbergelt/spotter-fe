import React, { memo, useState, useRef } from 'react';
import moment, { Moment } from 'moment';
import { Workout } from 'src/types/Workout';
import { useWindowSize } from 'react-use';
import { FiPlusCircle } from 'react-icons/fi';
import Dropdown from 'src/components/lib/Dropdown';
import Head from 'src/components/lib/Head';
import styles from './GridDay.module.scss';
import Flex from 'src/components/lib/Flex';

interface Props {
  date: Moment;
  i: number;
  openModal: Function;
  workouts: Array<Workout>;
}

// an individual day in the 30 day+ workout grid

const GridDay: React.FC<Props> = ({ date, i, openModal, workouts }) => {
  const { width }: { width: number } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openWorkout = (workout: Workout): void => {
    setIsOpen(false);
    openModal(date, 'view', workout);
  };

  // helper component that renders multiple workouts that appear on the same day
  // allows multiple workouts in grid view without breaking UI
  interface Props {
    workouts: Array<Workout>;
  }

  const ViewMoreWorkouts: React.FC<Props> = ({ workouts }) => {
    if (isOpen) {
      return (
        <Dropdown css={styles.dropdown} setState={setIsOpen} triggerRef={ref}>
          <Head size={13} setState={setIsOpen} />
          {workouts
            .filter(el => el.date === date.format('MMM DD YYYY'))
            .map(workout => (
              <Flex
                fd='column'
                align='center'
                click={(): void => openWorkout(workout)}
                key={workout._id}
              >
                <p
                  style={{ background: workout.tags[0]?.color }}
                  className={styles.workout}
                >
                  {workout.title}
                </p>
              </Flex>
            ))}
        </Dropdown>
      );
    }
    return <></>;
  };

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
                {workouts.filter(el => el.date === date.format('MMM DD YYYY'))
                  .length > 1 && (
                  <>
                    <div
                      ref={ref}
                      onClick={(): void => setIsOpen(!isOpen)}
                      role='button'
                      className='grid-view-more'
                    >
                      {width <= 500 ? 'More' : 'View More'}
                    </div>
                    <ViewMoreWorkouts workouts={workouts} />
                  </>
                )}
              </div>
            )
        )}
    </section>
  );
};

export default memo(GridDay);

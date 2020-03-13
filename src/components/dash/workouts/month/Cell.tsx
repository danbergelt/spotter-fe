import React, { memo, Fragment } from 'react';
import moment, { Moment } from 'moment';
import { Workout } from 'src/types/Workout';
import { useWindowSize } from 'react-use';
import { FiPlusCircle } from 'react-icons/fi';
import styles from './Cell.module.scss';
import Flex from 'src/components/lib/Flex';
import MoreWorkouts from './MoreWorkouts';
import { Ctx } from 'src/types/Types';

interface Props {
  date: Moment;
  i: number;
  openModal: (date: Moment, ctx: Ctx, workout?: Workout | undefined) => void;
  workouts: Array<Workout>;
}

const Cell: React.FC<Props> = ({ date, i, openModal, workouts }) => {
  // viewport width for dynamic styles
  const { width } = useWindowSize();

  // slice workout title when viewport is tablet sized and lower
  const formatTitle = (title: string): string => {
    if (width <= 800 && title.length > 5) {
      return `${title.slice(0, 4)}...`;
    }
    return title;
  };

  // filter all workouts that match the current cell's date
  const matchDate = (workouts: Array<Workout>): Array<Workout> => {
    return workouts.filter(
      workout => workout.date === date.format('MMM DD YYYY')
    );
  };

  // match a workout to today's date
  const matchTodayDate = (): string => {
    if (date.format('MMM DD YYYY') === moment().format('MMM DD YYYY')) {
      return styles.todayDate;
    }
    return styles.date;
  };

  return (
    <Flex
      fd='column'
      align='center'
      css={styles.day}
      testid={date.format('MMM DD YYYY')}
    >
      <Flex justify='space-between' align='center' css={styles.head}>
        {i <= 6 && <p>{date.format('ddd')}</p>}
        <div
          onClick={(): void => openModal(date, 'add')}
          className={styles.add}
          data-testid='add'
        >
          <FiPlusCircle />
        </div>
      </Flex>
      <Flex align='center' justify='center' css={matchTodayDate()}>
        {date.format('D')}
      </Flex>
      {matchDate(workouts).map(
        (workout, i) =>
          i === 0 && (
            <Fragment key={workout._id}>
              <div
                style={{ background: workout.tags[0]?.color }}
                className={styles.workout}
                onClick={(): void => openModal(date, 'view', workout)}
              >
                {formatTitle(workout.title)}
              </div>
              {matchDate(workouts).length > 1 && (
                <MoreWorkouts
                  matchDate={matchDate}
                  workouts={workouts}
                  date={date}
                  openModal={openModal}
                />
              )}
            </Fragment>
          )
      )}
    </Flex>
  );
};

export default memo(Cell);

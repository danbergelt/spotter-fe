import React, { memo, Fragment } from 'react';
import moment, { Moment } from 'moment';
import { Workout } from 'src/types/Workout';
import { useWindowSize } from 'react-use';
import { FiPlusCircle } from 'react-icons/fi';
import styles from './Cell.module.scss';
import Flex from 'src/components/lib/Flex';
import MoreWorkouts from './MoreWorkouts';
import { Ctx } from 'src/types/Types';

/*== Grid cell =====================================================

This component represents each cell in the monthly view on the dashboard.
It contains all workouts for each day in any given month. Since space
is more limited, the format in which workouts are rendered is slightly
different. The title is rendered over a backdrop of whatever the first
tag color is. If the workout has no tags, a default red is chosen.

Click on each workout to open it's respective 'view' modal. There is
also a small + icon to add a new workout. If there is more than one
workout on any given day, an additional 'view more' button is rendered.
This can be clicked on to display a dropdown of all workouts for that day
in a more controlled format.

Props:
  date: Moment
    today's date as a moment object
  i: number
    the index for each cell. the top row contains the weekday, so need
    the index to track which cells are at the top
  openModal: function
    opens an add/view workout modal
  workouts: Array<Workout>
    today's workouts

*/

interface Props {
  date: Moment;
  cell: number;
  openModal: (date: Moment, ctx: Ctx, workout?: Workout | undefined) => void;
  workouts: Array<Workout>;
}

const Cell: React.FC<Props> = ({ date, cell, openModal, workouts }) => {
  // viewport width for dynamic styles
  const { width } = useWindowSize();

  // slice workout title when viewport is tablet sized and lower
  const formatTitle = (title: string): string => {
    if (width <= 800 && title.length > 5) {
      return `${title.slice(0, 4)}...`;
    }
    return title;
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
        {cell <= 6 && <p>{date.format('ddd')}</p>}
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
      {workouts.map(
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
              {workouts.length > 1 && (
                <MoreWorkouts
                  cell={cell}
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

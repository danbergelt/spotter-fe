import React, { memo } from 'react';
import moment, { Moment } from 'moment';
import { Workout } from 'src/types';
import { useWindowSize } from 'react-use';
import { FiPlusCircle } from 'react-icons/fi';
import styles from './Cell.module.scss';
import Flex from 'src/components/lib/Flex';
import MoreWorkouts from './MoreWorkouts';
import { Ctx } from 'src/types';
import { momentHelpers } from 'src/utils/momentUtils';

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
  openModal: (ctx: Ctx, workout: Partial<Workout>) => void;
  workouts: Array<Workout>;
}

const Cell: React.FC<Props> = ({ date, cell, openModal, workouts }) => {
  // standardized date format
  const { FORMAT_NUMERIC, FORMAT_FULL, FORMAT_WEEKDAY } = momentHelpers;

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
    if (date.format(FORMAT_FULL) === moment().format(FORMAT_FULL)) {
      return styles.todayDate;
    }
    return styles.date;
  };

  return (
    <Flex
      fd='column'
      align='center'
      css={styles.day}
      testid={date.format(FORMAT_FULL)}
    >
      <Flex justify='space-between' align='center' css={styles.head}>
        {cell <= 6 && <p>{date.format(FORMAT_WEEKDAY)}</p>}
        <div
          onClick={(): void =>
            openModal('add', { date: date.format(FORMAT_FULL) })
          }
          className={styles.add}
          data-testid='add'
        >
          <FiPlusCircle />
        </div>
      </Flex>
      <Flex align='center' justify='center' css={matchTodayDate()}>
        {date.format(FORMAT_NUMERIC)}
      </Flex>
      {!!workouts.length && (
        // if the cell has workouts, render the first workout of the day
        <div
          style={{ background: workouts[0].tags[0]?.color }}
          className={styles.workout}
          onClick={(): void => openModal('view', workouts[0])}
        >
          {formatTitle(workouts[0].title)}
        </div>
      )}
      {workouts.length > 1 && (
        // if the cell has more than one workout, render the more workouts button and pass workouts prop
        <MoreWorkouts
          cell={cell}
          workouts={workouts}
          date={date}
          openModal={openModal}
        />
      )}
    </Flex>
  );
};

export default memo(Cell);

import React, { memo } from 'react';
import Card from './Card';
import { Moment } from 'moment';
import { Workout } from 'src/types/Workout';
import { FiPlusCircle } from 'react-icons/fi';
import { useWindowSize } from 'react-use';
import styles from './Column.module.scss';
import Flex from 'src/components/lib/Flex';
import { Ctx } from 'src/types/Types';
import { momentHelpers } from 'src/utils/momentUtils';

/*== Workout Column =====================================================

The column component that displays in the dashboard weekly view. One for
each day of the week. Contains the current day, a button that allows you
to add a new workout, and a list of all workouts for each day.

Props:
  date: Moment
    the date for this column
  openModal: Function
    the function that opens a view/add workout modal
  workouts: Array<Workout>
    all workouts for this date
*/

interface Props {
  date: Moment;
  openModal: (ctx: Ctx, workout: Partial<Workout>) => void;
  workouts: Array<Workout>;
}

const WorkoutColumn: React.FC<Props> = ({ date, openModal, workouts }) => {
  // width for styling based on viewport size
  const { width } = useWindowSize();

  // helper that renders strings based on viewport size
  const addWorkoutText = (): string | null => {
    if (width <= 500) {
      return null;
    } else if (width <= 800) {
      return 'Add';
    } else {
      return 'Add Workout';
    }
  };

  // standardized date formats
  const { FORMAT_WEEKDAY, FORMAT_NUMERIC, FORMAT_FULL } = momentHelpers;

  return (
    <div className={styles.container}>
      {/* current date */}
      <section className={styles.day} data-testid={date.format(FORMAT_FULL)}>
        <p className={styles.weekday}>{date.format(FORMAT_WEEKDAY)}</p>
        <p className={styles.date}>{date.format(FORMAT_NUMERIC)}</p>
      </section>
      {/* add workout */}
      <Flex
        align='center'
        justify='center'
        click={(): void => openModal('add', { date: date.format(FORMAT_FULL) })}
        css={styles.add}
        testid='add'
      >
        {<FiPlusCircle className={styles.icon} />} {addWorkoutText()}
      </Flex>
      {/* render all workouts for this date */}
      {workouts.map(workout => (
        <Flex
          fd='column'
          align='flex-start'
          css={styles.card}
          click={(): void => openModal('view', workout)}
          key={workout._id}
        >
          <Card workout={workout} />
        </Flex>
      ))}
    </div>
  );
};

export default memo(WorkoutColumn);

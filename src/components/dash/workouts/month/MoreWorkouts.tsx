import React, { useState, useRef } from 'react';
import styles from './MoreWorkouts.module.scss';
import { useWindowSize } from 'react-use';
import Dropdown from 'src/components/lib/Dropdown';
import Head from 'src/components/lib/Head';
import { Workout } from 'src/types/Workout';
import { Moment } from 'moment';
import Flex from 'src/components/lib/Flex';
import { Ctx } from 'src/types/Types';

/*== More Workouts =====================================================

This component comes into play when there are more than one workouts on
a given day in the monthly view. Since we can't display all of the workouts
in a single cell, we can display a prompt to "View More", and trigger
a popup on click. This popup then contains all of the workouts in one
place in a way that will not break the UI of the grid

Props:
  workouts: Array<Workout>
    all of the workouts for this time period
  date: Moment
    this cell's date
  openModal: Function
    open the workout modal
  matchDate: Functions
    a function to match a workout's date to it's respective cell
*/

interface Props {
  workouts: Array<Workout>;
  date: Moment;
  openModal: (date: Moment, ctx: Ctx, workout?: Workout | undefined) => void;
}

const MoreWorkouts: React.FC<Props> = ({ workouts, date, openModal }) => {
  // dropdown state
  const [isOpen, setIsOpen] = useState(false);

  // viewport width for mobile styling
  const { width } = useWindowSize();

  // trigger point for dropdown
  const ref = useRef(null);

  // close dropdown, open workout modal on workout click
  const openWorkout = (workout: Workout): void => {
    setIsOpen(false);
    openModal(date, 'view', workout);
  };
  return (
    <>
      <div
        ref={ref}
        onClick={(): void => setIsOpen(!isOpen)}
        className={styles.more}
      >
        {width <= 500 ? 'More' : 'View More'}
      </div>
      {isOpen && (
        <Dropdown css={styles.dropdown} setState={setIsOpen} triggerRef={ref}>
          <Head size={13} setState={setIsOpen} />
          {workouts.map(workout => (
            <Flex
              fd='column'
              align='center'
              click={(): void => openWorkout(workout)}
              key={workout._id}
            >
              <p
                style={{ background: workout.tags[0]?.color }}
                className={styles.additional}
              >
                {workout.title}
              </p>
            </Flex>
          ))}
        </Dropdown>
      )}
    </>
  );
};

export default MoreWorkouts;
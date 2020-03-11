import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Flex from 'src/components/lib/Flex';
import styles from './Controls.module.scss';
import { useDispatch } from 'react-redux';
import { incOrDecAction } from 'src/actions/globalActions';

/*== Controls =====================================================

This component increments and decrements the current date in view
on the dashboard. It allows the user to see all of their workouts in
the past, and plan workouts in the future.

Props:
  time: number
    the timespan to increment or decrement by. e.g. if 1 is passed in
    when the user is on the week view, the dash will move forward
    by one week
  month: function
    this is a function that sets the head of the dashboard, indicating
    what month it is
  ctx: week | month
    the global context used to determine functionality of the setHead
    function
*/

interface Props {
  time: number;
  setHead: (num: number, ctx: 'week' | 'month') => string;
  ctx: 'week' | 'month';
}

// controls incrementing/decrementing the date in view

const Controls: React.FC<Props> = ({ time, setHead, ctx }) => {
  // state dispatcher
  const dispatch = useDispatch();

  // increment the current time
  const inc = (): void => {
    dispatch(incOrDecAction('inc', time));
  };

  // decrement the current time
  const dec = (): void => {
    dispatch(incOrDecAction('dec', time));
  };

  return (
    <Flex justify='space-between' align='center'>
      <Flex align='center' cn={styles.container}>
        <div className={styles.icons}>
          <FiChevronLeft
            data-testid='back'
            onClick={dec}
            className={styles.icon}
          />
          <FiChevronRight
            data-testid='forward'
            onClick={inc}
            className={styles.icon}
          />
        </div>
        <div data-testid='date'>{setHead(time, ctx)}</div>
      </Flex>
      <Link to='/prs' className={styles.pr}>
        PRs
      </Link>
    </Flex>
  );
};

export default Controls;

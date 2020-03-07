import React from 'react';
import { FaCircle } from 'react-icons/fa';
import moment from 'moment';
import { Exercise } from 'src/types/ExerciseOption';
import Flex from '../util/Flex';
import styles from './Pr.module.scss';

/*== PR Data =====================================================

This component renders PR data inside of each PR section. PR data
includes exercise name, a color-coded SVG that corresponds to date
set/parent section, PR date and PR weight.

This data is mapped by the parent (last month, last year,
all time) into each appropriate location. 

The data is color-coded according to date the PR was set. A recent
PR (set in the last month) is green, a moderately recent PR (set in
the last year) is blue, and an old PR (older than a year) is red.

Props:
  exercise: Exercise
    the saved exercise that contains PR data
  i: number
    the index, used to manipulate styles

*/

interface Props {
  exercise: Exercise;
  i: number;
}

const Pr: React.FC<Props> = ({ exercise, i }) => {
  // set the PR's classname according to the date the PR was set
  const setClassName = (): string => {
    // calc diff between current date and pr date
    const diff: number = moment().diff(
      moment(exercise.prDate, 'MMM DD YYYY'),
      'days'
    );
    // color code circles according to date
    if (diff <= 31) {
      return `${styles.circle} ${styles.month}`;
    } else if (31 < diff && diff <= 365) {
      return `${styles.circle} ${styles.year}`;
    } else {
      return `${styles.circle} ${styles.allTime}`;
    }
  };

  return (
    <Flex
      justify='space-between'
      css={{ marginTop: i > 0 ? '2rem' : undefined }}
    >
      <Flex align='center'>
        <div className={setClassName()}>
          <FaCircle />
        </div>
        <p className={styles.font}>{exercise.name}</p>
      </Flex>
      <Flex>
        <p className={styles.date}>{exercise.prDate}</p>
        <p className={styles.weight}>{exercise.pr}lbs</p>
      </Flex>
    </Flex>
  );
};

export default Pr;

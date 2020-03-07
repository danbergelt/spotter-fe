import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';
import Pr from './Pr';
import { SortedPrsRange } from '../../types/Prs';
import moment from 'moment';
import styles from './PrGroup.module.scss';
import Toggler from '../util/Toggler';
import Tip from '../util/Tip';
import { FiInfo } from 'react-icons/fi';
import Flex from '../util/Flex';

/*== Pr Group =====================================================

A PR group is a collection of PRs bucketed out by date.

Potential buckets include:
  PRs set in the last month
  PRs set in the last year
  PRs older than a year

PRs are bucketed out, sorted within their respective buckets so that
the most recent PRs come first, and color coded. 

There is a toggler that allows the user to collapse specific sections. 
This can be useful for more neurotic lifters who track every single 
exercise they perform, at which point this list could potentially get 
long and unwieldy. There is also a tooltip component that reminds
users that only saved exercises can be tracked.

If no PRs are present in a given range then a placeholder msg is shown

Props
  title: string
    the title of this specific bucket, either "Last Month", "Last Year",
    or "All Time"
  prs: Array<Exercise>
    an array of saved exercises. each exercise contains PR data

*/

interface Props {
  title: string;
  prs: SortedPrsRange;
}

const PrGroup: React.FC<Props> = ({ title, prs }) => {
  // pr group toggle
  const [open, setOpen] = useState(true);

  return (
    <section className={styles.container}>
      <Flex
        justify='space-between'
        align='center'
        cn={open ? `${styles.head} ${styles.open}` : styles.head}
      >
        <Flex cn={styles.prSpacer} click={(): void => setOpen(!open)}>
          <Toggler
            state={open}
            on={IoMdArrowDropdown}
            off={IoMdArrowDropright}
          />
          <div className={styles.title}>{title}</div>
        </Flex>
        {/* place the tooltip at the top bucket */}
        {title === 'Last Month' && (
          <Tip place='left' trigger={FiInfo} content='tracks saved exercises' />
        )}
      </Flex>
      {open && (
        <section className={styles.box}>
          {!prs.length && <p className={styles.empty}>No PRs in this range</p>}
          {prs
            // sort prs by date (most recent comes first)
            .sort((a, b) =>
              moment(b.prDate, 'MMM DD YYYY').diff(
                moment(a.prDate, 'MMM DD YYYY')
              )
            )
            // map into individual prs
            .map((exercise, i) => (
              <Pr key={exercise.name} exercise={exercise} i={i} />
            ))}
        </section>
      )}
    </section>
  );
};

export default PrGroup;

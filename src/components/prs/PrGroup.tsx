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

interface Props {
  title: string;
  prs: SortedPrsRange;
}

const PrGroup: React.FC<Props> = ({ title, prs }) => {
  // pr group toggle
  const [open, setOpen] = useState(true);

  return (
    <section className={styles.container}>
      <Flex sb ac cn={open ? `${styles.head} ${styles.open}` : styles.head}>
        <Flex cn={styles.prSpacer} click={(): void => setOpen(!open)}>
          <Toggler
            state={open}
            on={IoMdArrowDropdown}
            off={IoMdArrowDropright}
          />
          <div className={styles.title}>{title}</div>
        </Flex>
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

import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';
import Pr from './Pr';
// import { FiInfo } from 'react-icons/fi';
// import ReactTooltip from 'react-tooltip';
import { SortedPrsRange } from '../../types/Prs';
import moment from 'moment';
import styles from './PrGroup.module.scss';
import Toggler from '../util/Toggler';
import Tip from '../util/Tip';
import { FiInfo } from 'react-icons/fi';

interface Props {
  title: string;
  prs: SortedPrsRange;
}

const PrGroup: React.FC<Props> = ({ title, prs }) => {
  // expandable pr group - toggle to open and close
  const [open, setOpen] = useState(true);

  return (
    <section className={styles.container}>
      <div className={open ? `${styles.head} ${styles.open}` : styles.head}>
        <div className={styles.prSpacer} onClick={(): void => setOpen(!open)}>
          <Toggler
            state={open}
            on={IoMdArrowDropdown}
            off={IoMdArrowDropright}
          />
          <div className={styles.title}>{title}</div>
        </div>
        {title === 'Last Month' && (
          <Tip place='left' trigger={FiInfo} content='tracks saved exercises' />
        )}
      </div>
      {open && (
        <section className={styles.box}>
          {!prs.length && <p className='no-prs'>No PRs found in this range</p>}
          {prs
            // sorting the prs by date (most recent comes first)
            .sort((a, b) =>
              moment(b.prDate, 'MMM DD YYYY').diff(
                moment(a.prDate, 'MMM DD YYYY')
              )
            )
            .map((exercise, i) => (
              <Pr key={exercise.name} exercise={exercise} i={i} />
            ))}
        </section>
      )}
    </section>
  );
};

export default PrGroup;

import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';
import Pr from './Pr';
import { FiInfo } from 'react-icons/fi';
import ReactTooltip from 'react-tooltip';
import { SortedPrsRange } from '../../types/Prs';
import { useWindowSize } from 'react-use';
import moment from 'moment';
import styles from './PrGroup.module.scss';
import Toggler from '../util/Toggler';

interface Props {
  title: string;
  prs: SortedPrsRange;
}

const PrGroup: React.FC<Props> = ({ title, prs }) => {
  // expandable pr group - toggle to open and close
  const [open, setOpen] = useState(true);

  // used to modify mobile styles in JS
  const { width } = useWindowSize();

  return (
    <section className={styles.container}>
      <div className={open ? `${styles.title} ${styles.open}` : styles.title}>
        <div
          role='button'
          className={styles.prSpacer}
          onClick={(): void => setOpen(!open)}
        >
          <Toggler
            state={open}
            on={IoMdArrowDropdown}
            off={IoMdArrowDropright}
          />
          <div style={{ marginLeft: '1rem' }}>{title}</div>
        </div>
        {title === 'Last Month' && (
          <div data-tip data-for='pr-info' className='pr-info'>
            <FiInfo />
          </div>
        )}
        <ReactTooltip place='left' id='pr-info' effect='solid'>
          <p style={{ width: width <= 500 ? '150px' : '200px' }}>
            Save your exercises, and we&#39;ll show your PRs on this page!
          </p>
        </ReactTooltip>
      </div>
      {open && (
        <section className='pr-section-box'>
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

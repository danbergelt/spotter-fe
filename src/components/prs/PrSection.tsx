import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';
import Pr from './Pr';
import { FiInfo } from 'react-icons/fi';
import ReactTooltip from 'react-tooltip';
import { SortedPrsRange } from '../../types/Prs';
import { Exercise } from '../../types/ExerciseOption';
import { useWindowSize } from 'react-use';

// Hacky fix to resolve error with default imports from moment and typescript
// eslint-disable-next-line
let m = require('moment');
if ('default' in m) {
  m = m['default'];
}

interface Props {
  title: string;
  prs: SortedPrsRange;
}

const PrSection: React.FC<Props> = ({ title, prs }) => {
  const [open, setOpen] = useState(true);
  const [hover, setHover] = useState(false);

  const { width } = useWindowSize();

  return (
    <section className='pr-section'>
      <div className={open ? 'pr-title open' : 'pr-title closed'}>
        <div
          role='button'
          className='pr-spacer'
          onMouseEnter={(): void => setHover(true)}
          onMouseLeave={(): void => setHover(false)}
          onClick={(): void => setOpen(!open)}
        >
          {open ? (
            <div className={hover ? 'hover-pr-dropdown' : 'pr-dropdown'}>
              <IoMdArrowDropdown />
            </div>
          ) : (
            <div className={hover ? 'hover-pr-dropdown' : 'pr-dropdown'}>
              <IoMdArrowDropright />
            </div>
          )}
          <div style={{ marginLeft: '1rem' }}>{title}</div>
        </div>
        {title === 'Last Month' && (
          <div data-tip data-for='pr-info' className='pr-info'>
            <FiInfo />
          </div>
        )}
        <ReactTooltip place='left' id='pr-info' effect='solid'>
          <p style={{ width: width <= 500 ? '150px' : '200px' }}>
            Save your favorite exercises, and we&#39;ll show your PRs on this
            page!
          </p>
        </ReactTooltip>
      </div>
      {open && (
        <section className='pr-section-box'>
          {!prs.length && <p className='no-prs'>No PRs found in this range</p>}
          {prs
            // sorting the prs by date (most recent comes first)
            .sort((a: Exercise, b: Exercise) =>
              m(b.prDate, 'MMM DD YYYY').diff(m(a.prDate, 'MMM DD YYYY'))
            )
            .map((exercise: Exercise) => (
              <Pr key={exercise.name} exercise={exercise} />
            ))}
        </section>
      )}
    </section>
  );
};

export default PrSection;

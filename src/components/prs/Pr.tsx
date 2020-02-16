import React from 'react';
import { FaCircle } from 'react-icons/fa';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Exercise } from 'src/types/ExerciseOption';
const moment = extendMoment(Moment);

// Hacky fix to resolve error with default imports from moment and typescript
// eslint-disable-next-line
let m = require('moment');
if ('default' in m) {
  m = moment['default'];
}

interface Props {
  pr: Exercise;
}

const Pr: React.FC<Props> = ({ pr }) => {
  const setClassName = (pr: Exercise): string | undefined => {
    // difference between the date on the pr and the current date
    const diff: number = m().diff(m(pr.prDate, 'MMM DD YYYY'), 'days');

    if (diff <= 31) {
      return 'pr-circle lastMonth';
    } else if (31 < diff && diff <= 365) {
      return 'pr-circle lastYear';
    } else if (diff > 365) {
      return 'pr-circle allTime';
    } else {
      return undefined;
    }
  };

  return (
    <article className='pr'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          // color-coding circle to indicate if a PR is recent or old
          className={setClassName(pr)}
        >
          <FaCircle />
        </div>
        <p>{pr.name}</p>
      </div>
      <div style={{ display: 'flex' }}>
        <p className='pr-date'>{pr.prDate}</p>
        <p style={{ fontWeight: 'bold' }}>{pr.pr}lbs</p>
      </div>
    </article>
  );
};

export default Pr;

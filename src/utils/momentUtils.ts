import * as Moment from 'moment';
import { extendMoment, MomentRange, DateRange } from 'moment-range';

const moment: MomentRange = extendMoment(Moment);

// Used for generating days of week in dashboard
// due to the way in which the moment object is exported, I need to override the moment object with moment["default"] to satisfy type errors and import a function
// to see more on this, see this open issue: https://github.com/palantir/blueprint/issues/959

// eslint-disable-next-line
let m = require('moment');
if ('default' in m) {
  m = moment['default'];
}

interface Params {
  (num: number): Moment.Moment[];
}

export const generateWeek: Params = num => {
  const start: Moment.Moment = m()
    .add(num, 'weeks')
    .startOf('week');
  const end: Moment.Moment = m()
    .add(num, 'weeks')
    .endOf('week');
  const range: DateRange = moment.range(start, end);

  const days: Array<Moment.Moment> = [];

  for (const day of range.by('day')) {
    days.push(day);
  }

  return days;
};

// Used to set header of dashboard

export const dashHead = (num: number): string => {
  return m()
    .add(num, 'weeks')
    .startOf('week')
    .format('MMMM YYYY');
};

// Used for generating days of month in dashboard

export const generateMonth = (num: number): Moment.Moment[] => {
  const start: Moment.Moment = m()
    .add(num, 'months')
    .startOf('month')
    .startOf('week');
  const end: Moment.Moment = m()
    .add(num, 'months')
    .endOf('month');

  const leftover: number = 34 - Number(end.diff(start, 'days'));

  end.add(leftover, 'days');

  const range: DateRange = moment.range(start, end);

  const days: Array<Moment.Moment> = [];

  for (const day of range.by('day')) {
    days.push(day);
  }

  return days;
};

// Used to set header of monthly dashboard view

export const monthDashHead = (num: number): string => {
  return m()
    .add(num, 'months')
    .startOf('month')
    .format('MMMM YYYY');
};

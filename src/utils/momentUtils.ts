import * as Moment from 'moment';
import { extendMoment, MomentRange } from 'moment-range';
import { Scope, Date } from 'src/types';

/*== moment utilities =====================================================

A set of utility functions that extend the Moment library https://github.com/moment/moment

Includes a namespace consisting of oft-referenced helpers, and a set of functions
that are integral in fetching ranges of workouts, building a UI, and more

*/

// HACK --> due to the way in which the moment object is exported, I need to override the moment object with moment["default"]
// to satisfy type errors and import a function
// to see more on this: https://github.com/palantir/blueprint/issues/959
const momentRange: MomentRange = extendMoment(Moment);
// eslint-disable-next-line
let moment = require('moment');
if ('default' in momentRange) {
  moment = momentRange['default'];
}

// helper namespace that contains repeated moment logic
export const momentHelpers = {
  FORMAT_FULL: 'MMM DD YYYY',
  FORMAT_MONTH: 'MMMM YYYY',
  FORMAT_WEEKDAY: 'ddd',
  FORMAT_NUMERIC: 'D',
  rangeBuilder: function(start: Date, end: Date): Array<Date> {
    const range = momentRange.range(start, end);
    const days = [];
    for (const day of range.by('day')) {
      days.push(day);
    }
    return days;
  },
  startOfRange: function(num: number, scope: 'month' | 'week'): Date {
    return moment()
      .add(num, `${scope}s`)
      .startOf(scope);
  },
  endOfRange: function(num: number, scope: 'month' | 'week'): Date {
    return moment()
      .add(num, `${scope}s`)
      .endOf(scope);
  }
};

// generate a week of dates (non-formatted)
export const generateWeek = (num: number): Date[] => {
  const { startOfRange, endOfRange, rangeBuilder } = momentHelpers;
  const start = startOfRange(num, 'week');
  const end = endOfRange(num, 'week');
  return rangeBuilder(start, end);
};

// Generate the current month and year
export const setHead = (num: number, scope: Scope): string => {
  const { startOfRange, FORMAT_MONTH } = momentHelpers;
  return startOfRange(num, scope).format(FORMAT_MONTH);
};

// Generate a month of dates (non-formatted)
export const generateMonth = (num: number): Date[] => {
  const { startOfRange, endOfRange, rangeBuilder } = momentHelpers;
  const start = startOfRange(num, 'month').startOf('week');
  const end = endOfRange(num, 'month');
  const extra = 34 - end.diff(start, 'days');
  end.add(extra, 'days');
  return rangeBuilder(start, end);
};

// prefetch weeks from server (last 2 weeks, this week, next 2 weeks)
// TODO --> test
export const prefetchWeeks = (num: number): string[] => {
  const { startOfRange, endOfRange, rangeBuilder, FORMAT_FULL } = momentHelpers;
  const start = startOfRange(num - 2, 'week');
  const end = endOfRange(num + 2, 'week');
  return rangeBuilder(start, end).map(date => date.format(FORMAT_FULL));
};

// prefetch months from server (last 2 months, this month, next 2 months)
// TODO --> test
export const prefetchMonths = (num: number): string[] => {
  const { startOfRange, endOfRange, rangeBuilder, FORMAT_FULL } = momentHelpers;
  const start = startOfRange(num - 2, 'month');
  const end = endOfRange(num + 2, 'month');
  const startOfNextMonth = startOfRange(num + 1, 'month').startOf('week');
  const extra = 34 - end.diff(startOfNextMonth, 'days');
  end.add(extra, 'days');
  return rangeBuilder(start, end).map(date => date.format(FORMAT_FULL));
};

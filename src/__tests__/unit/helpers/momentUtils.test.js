import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {
  generateWeek,
  dashHead,
  generateMonth,
  monthDashHead
} from '../../../utils/momentUtils';

const moment = extendMoment(Moment);

describe('moment utils', () => {
  test('generate week', () => {
    expect(generateWeek(0)[0].format('MMM DD')).toEqual(
      moment()
        .startOf('week')
        .format('MMM DD')
    );
    expect(generateWeek(0)[6].format('MMM DD')).toEqual(
      moment()
        .endOf('week')
        .format('MMM DD')
    );
    expect(generateWeek(-1)[0].format('MMM DD')).toEqual(
      moment()
        .add(-1, 'weeks')
        .startOf('week')
        .format('MMM DD')
    );
    expect(generateWeek(-1)[6].format('MMM DD')).toEqual(
      moment()
        .add(-1, 'weeks')
        .endOf('week')
        .format('MMM DD')
    );
    expect(generateWeek(1)[0].format('MMM DD')).toEqual(
      moment()
        .add(1, 'weeks')
        .startOf('week')
        .format('MMM DD')
    );
    expect(generateWeek(1)[6].format('MMM DD')).toEqual(
      moment()
        .add(1, 'weeks')
        .endOf('week')
        .format('MMM DD')
    );
  });

  test('dashHead', () => {
    expect(dashHead(-4)).toMatch(
      moment()
        .add(-4, 'weeks')
        .startOf('week')
        .format('MMMM')
    );
    expect(dashHead(4)).toMatch(
      moment()
        .add(4, 'weeks')
        .startOf('week')
        .format('MMMM')
    );
  });

  test('generate month', () => {
    expect(generateMonth(0)[0].format('MMM DD')).toEqual(
      moment()
        .startOf('month')
        .startOf('week')
        .format('MMM DD')
    );
    expect(generateMonth(-1)[0].format('MMM DD')).toEqual(
      moment()
        .add(-1, 'months')
        .startOf('month')
        .startOf('week')
        .format('MMM DD')
    );
    expect(generateMonth(1)[0].format('MMM DD')).toEqual(
      moment()
        .add(1, 'months')
        .startOf('month')
        .startOf('week')
        .format('MMM DD')
    );
  });

  test('monthly dashHead', () => {
    expect(monthDashHead(0)).toMatch(
      moment()
        .startOf('month')
        .format('MMMM')
    );
    expect(monthDashHead(-4)).toMatch(
      moment()
        .add(-4, 'months')
        .startOf('month')
        .format('MMMM')
    );
    expect(monthDashHead(4)).toMatch(
      moment()
        .add(4, 'months')
        .startOf('month')
        .format('MMMM')
    );
  });
});

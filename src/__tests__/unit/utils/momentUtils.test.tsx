import moment from 'moment';
import {
  momentHelpers,
  generateWeek,
  setHead,
  generateMonth
} from '../../../utils/momentUtils';

const {
  rangeBuilder,
  startOfRange,
  endOfRange,
  FORMAT_FULL,
  FORMAT_MONTH
} = momentHelpers;

describe('moment utils', () => {
  const today = moment();
  const twoDaysFromNow = moment().add(2, 'days');

  beforeEach(() => {
    const raw = new Date();
    const refresh = moment(raw);
    today.set(refresh.toObject());
    twoDaysFromNow.set(refresh.toObject()).add(2, 'days');
  });

  test('rangeBuilder', () => {
    const range = rangeBuilder(today, twoDaysFromNow).map(date =>
      date.format(FORMAT_FULL)
    );
    expect(range[0]).toBe(today.format(FORMAT_FULL));
    expect(range[1]).toBe(today.add(1, 'days').format(FORMAT_FULL));
    expect(range[2]).toBe(twoDaysFromNow.format(FORMAT_FULL));
  });

  test('startOfRange (current week)', () => {
    const day = startOfRange(0, 'week').format(FORMAT_FULL);
    expect(day).toBe(today.startOf('week').format(FORMAT_FULL));
  });

  test('startOfRange (last week)', () => {
    const day = startOfRange(-1, 'week').format(FORMAT_FULL);
    expect(day).toBe(
      today
        .subtract(1, 'week')
        .startOf('week')
        .format(FORMAT_FULL)
    );
  });

  test('startOfRange (next week)', () => {
    const day = startOfRange(1, 'week').format(FORMAT_FULL);
    expect(day).toBe(
      today
        .add(1, 'week')
        .startOf('week')
        .format(FORMAT_FULL)
    );
  });

  test('startOfRange (current month)', () => {
    const day = startOfRange(0, 'month').format(FORMAT_FULL);
    expect(day).toBe(today.startOf('month').format(FORMAT_FULL));
  });

  test('startOfRange (previous month)', () => {
    const day = startOfRange(-1, 'month').format(FORMAT_FULL);
    expect(day).toBe(
      today
        .subtract(1, 'month')
        .startOf('month')
        .format(FORMAT_FULL)
    );
  });

  test('startOfRange (next month)', () => {
    const day = startOfRange(1, 'month').format(FORMAT_FULL);
    expect(day).toBe(
      today
        .add(1, 'month')
        .startOf('month')
        .format(FORMAT_FULL)
    );
  });

  test('endOfRange (current week)', () => {
    const day = endOfRange(0, 'week').format(FORMAT_FULL);
    expect(day).toBe(today.endOf('week').format(FORMAT_FULL));
  });

  test('endOfRange (last week)', () => {
    const day = endOfRange(-1, 'week').format(FORMAT_FULL);
    expect(day).toBe(
      today
        .subtract(1, 'week')
        .endOf('week')
        .format(FORMAT_FULL)
    );
  });

  test('endOfRange (next week)', () => {
    const day = endOfRange(1, 'week').format(FORMAT_FULL);
    expect(day).toBe(
      today
        .add(1, 'week')
        .endOf('week')
        .format(FORMAT_FULL)
    );
  });

  test('endOfRange (current month)', () => {
    const day = endOfRange(0, 'month').format(FORMAT_FULL);
    expect(day).toBe(today.endOf('month').format(FORMAT_FULL));
  });

  test('endOfRange (last month)', () => {
    const day = endOfRange(-1, 'month').format(FORMAT_FULL);
    expect(day).toBe(
      today
        .subtract(1, 'month')
        .endOf('month')
        .format(FORMAT_FULL)
    );
  });

  test('endOfRange (next month)', () => {
    const day = endOfRange(1, 'month').format(FORMAT_FULL);
    expect(day).toBe(
      today
        .add(1, 'month')
        .endOf('month')
        .format(FORMAT_FULL)
    );
  });

  test('generateWeek (current week)', () => {
    const week = generateWeek(0).map(day => day.format(FORMAT_FULL));
    expect(week.length).toBe(7);
    expect(week[0]).toBe(today.startOf('week').format(FORMAT_FULL));
    expect(week[6]).toBe(today.endOf('week').format(FORMAT_FULL));
  });

  test('generateWeek (last week)', () => {
    const week = generateWeek(-1).map(day => day.format(FORMAT_FULL));
    const lastWeek = today.subtract(1, 'week');
    expect(week.length).toBe(7);
    expect(week[0]).toBe(lastWeek.startOf('week').format(FORMAT_FULL));
    expect(week[6]).toBe(lastWeek.endOf('week').format(FORMAT_FULL));
  });

  test('generateWeek (next week)', () => {
    const week = generateWeek(1).map(day => day.format(FORMAT_FULL));
    const nextWeek = today.add(1, 'week');
    expect(week.length).toBe(7);
    expect(week[0]).toBe(nextWeek.startOf('week').format(FORMAT_FULL));
    expect(week[6]).toBe(nextWeek.endOf('week').format(FORMAT_FULL));
  });

  test('setHead', () => {
    const head = setHead(0, 'week');
    expect(head).toBe(today.startOf('week').format(FORMAT_MONTH));
  });

  test('generateMonth', () => {
    const month = generateMonth(0).map(day => day.format(FORMAT_FULL));
    expect(month.length).toBe(35);
    expect(month[0]).toBe(today.startOf('month').format(FORMAT_FULL));
  });
});

import { generateWeek, generateMonth } from './momentUtils';
import { store } from '../store';
import { fetchWorkouts } from '../actions/fetchWorkoutsActions';
import { History } from 'history';
import { Moment } from 'moment';

// utility function for fetching updated list of workouts upon mutation i.e. delete, update, save, etc.

interface Params {
  (time: number, history: History, scope: string, t: string | null): void;
}

const reFetch: Params = (time, history, scope, t) => {
  let range: Array<Moment> = [];

  if (scope === 'Week') {
    range = generateWeek(time);
  }

  if (scope === 'Month') {
    range = generateMonth(time);
  }

  const formattedRange: Array<string> = range.map(d => d.format('MMM DD YYYY'));
  // eslint-disable-next-line
  store.dispatch<any>(fetchWorkouts(formattedRange, history, t));
};

export default reFetch;

import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import PrGroup from '../components/prs/PrGroup';
import { Helmet } from 'react-helmet-async';
import { SavedExercise } from 'src/types';
import useToken from '../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { fetchExercisesQuery } from 'src/utils/queries';
import styles from './Prs.module.scss';

/*== PRs page =====================================================

A PR is a personal record for an exercise. This page tracks PRs for all
saved exercises, bucketed out into PRs set in the last month, PRs set
in the last year, and PRs set older than a year. The PRs are color-coded,
and organized into collapsable tabs.

TODO --> build out this page so that it's a catch-all 'stat's page
instead of just a place to find PRs. Provide insightful analytics,
graphs, and tools that allow users to deeply analyze their progress
and performance in the gym.

TODO --> move saved exercise management from the workout modal to this
page. It's unintuitive to have them separated.

*/

// bucket names
const CATEGORIES = ['Last Month', 'Last Year', 'All Time'];

// each bucket is an array of exercises
interface Buckets {
  month: Array<SavedExercise>;
  year: Array<SavedExercise>;
  all: Array<SavedExercise>;
}

const Prs: React.FC = () => {
  // api utils
  const [res, call] = useApi();

  // exercises state (each exercise contains PR metadata)
  const [exercises, setExercises] = useState({} as Buckets);

  // auth token
  const token = useToken();

  // reducer to bucket out each exercise into their respective bucket
  const reducer = useCallback(
    (acc: Buckets, exercise: SavedExercise): Buckets => {
      // find the diff between current date and the date the PR was set
      const diff = moment().diff(
        moment(exercise.prDate, 'MMM DD YYYY'),
        'days'
      );

      // check that a saved PR is not 0 or less
      const lbs = Boolean(exercise.pr && exercise.pr > 0);

      // organize by month, year, and all time
      if (diff <= 31 && lbs) acc.month.push(exercise);
      else if (diff <= 365 && lbs) acc.year.push(exercise);
      else lbs && acc.all.push(exercise);

      return acc;
    },
    []
  );

  // if exercises were fetched, reduce the exercises into their buckets
  // TODO --> proper error handling
  useEffect(() => {
    if (res.data) {
      const buckets: Buckets = { month: [], year: [], all: [] };
      setExercises(res.data.exercises.reduce(reducer, buckets));
    }
  }, [res, reducer]);

  // fetch exercises (each exercise contains PR metadata)
  useEffect(() => {
    call(fetchExercisesQuery, [token]);
  }, [call, token]);

  return (
    <>
      <Helmet>
        <title>Prs | Spotter</title>
      </Helmet>
      <div className={styles.container}>
        {Object.keys(exercises).map((key, i) => (
          <PrGroup
            key={CATEGORIES[i]}
            prs={exercises[key]}
            title={CATEGORIES[i]}
          />
        ))}
      </div>
    </>
  );
};

export default Prs;

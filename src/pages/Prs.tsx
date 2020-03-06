import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Moment from 'moment';
import { extendMoment, MomentRange } from 'moment-range';
import PrGroup from '../components/prs/PrGroup';
import { State } from 'src/types/State';
import { SortedPrs, SortedPrsRange } from '../types/Prs';
import { fetchExercisesAction } from 'src/actions/fetchExercisesActions';
import { Helmet } from 'react-helmet-async';
import { Exercise } from 'src/types/ExerciseOption';
import useToken from '../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { fetchExercisesQuery } from 'src/utils/queries';
const moment: MomentRange = extendMoment(Moment);

// Hacky fix to resolve error with default imports from moment and typescript
// eslint-disable-next-line
let m = require('moment');
if ('default' in m) {
  m = moment['default'];
}

const categories: Array<string> = ['Last Month', 'Last Year', 'All Time'];

const Prs: React.FC = () => {
  const dispatch = useDispatch();
  const [sortedPrs, setSortedPrs] = useState<SortedPrs>({
    lastMonth: [],
    lastYear: [],
    allTime: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [res, call] = useApi();
  const exercises: Array<Exercise> = useSelector(
    (state: State) => state.fetchExercisesReducer.savedExercises
  );

  const t: string | null = useToken();

  useEffect(() => {
    if (res.data) {
      dispatch(fetchExercisesAction(res.data.exercises));
    }

    if (res.error) {
      // handle later
    }
  }, [res, dispatch]);

  useEffect(() => {
    call(fetchExercisesQuery, [t]);
  }, [call, t]);

  // finds the difference between two moment dates
  const findDiff = (exercise: Exercise): number =>
    m().diff(m(exercise.prDate, 'MMM DD YYYY'), 'days');

  // set PRs to state organized by time period in which the PR was set
  useEffect(() => {
    // temporary variables for sorted prs
    const lastMonth: SortedPrsRange = [];
    const lastYear: SortedPrsRange = [];
    const allTime: SortedPrsRange = [];
    // loop through prs, and partition by date
    if (exercises.length) {
      exercises.forEach(exercise => {
        const timeSincePr = findDiff(exercise);
        if (exercise.pr && exercise.pr > 0 && exercise.prDate) {
          if (timeSincePr <= 31) {
            lastMonth.push(exercise);
          } else if (timeSincePr <= 365) {
            lastYear.push(exercise);
          } else {
            allTime.push(exercise);
          }
        }
      });
    }
    setSortedPrs({
      lastMonth,
      lastYear,
      allTime
    });

    // cleanup function to set loading to false, allowing the sections to be rendered
    return (): void => setLoading(false);
  }, [exercises]);

  return (
    <>
      <Helmet>
        <title>Prs | Spotter</title>
      </Helmet>
      <div className='prs-container spacer'>
        {!loading &&
          Object.keys(sortedPrs).map((key, i) => (
            <PrGroup
              key={categories[i]}
              prs={sortedPrs[key]}
              title={categories[i]}
            />
          ))}
      </div>
    </>
  );
};

export default Prs;

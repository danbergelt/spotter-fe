import React, { useState } from 'react';
import { downloadData } from '../../utils/dataDump';
import styles from './ExportWorkouts.module.scss';
import HTTPResponse from '../lib/HTTPResponse';

/*== Export workouts =====================================================

This component exports all the user's workouts in a CSV format. This could
be useful if they are transferring over to another form of workout tracking
and want access to their historical data, want to run more advanced
analyses on their data in Excel, or simply want their workout data in
another format.

The downloaded CSV contains all data that comes on the workout model,
including reps, sets, exercises, and date.

Props:
  t: string | null
    the current token in memory. passed to download data call

*/

interface Props {
  t: string | null;
}

const ExportWorkouts: React.FC<Props> = ({ t }) => {
  const [error, setError] = useState<string>('');

  return (
    <article className={styles.container}>
      <HTTPResponse
        css={{ width: '275px', marginLeft: '1.5rem', padding: '1rem' }}
        error={error}
        reset={(): void => setError('')}
      />
      <p className={styles.desc}>
        Export your workout data as a CSV file. Click below to start your
        download.
      </p>
      <div
        role='button'
        // the below function is a utility function that triggers downloads from a server
        onClick={(): Promise<void> => downloadData(setError, t, 'workouts')}
        className={styles.action}
      >
        Export workout data...
      </div>
    </article>
  );
};

export default ExportWorkouts;

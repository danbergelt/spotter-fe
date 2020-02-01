import React, { useState } from 'react';
import { downloadData } from '../../../utils/dataDump';

interface Props {
  t: string | null;
}

const ExportWorkouts: React.FC<Props> = ({ t }) => {
  const [dataDump, setDataDump] = useState<string>('');

  return (
    <article className='exports-container'>
      <p style={{ paddingLeft: '1.5rem', paddingBottom: '1rem' }}>
        Export your workout data as a CSV file. Click below to start your
        download.
      </p>
      <div
        role='button'
        onClick={(): Promise<void> => downloadData(setDataDump, t, 'workouts')}
        className='settings-action'
      >
        Export workout data...
      </div>
      <p>{dataDump && dataDump}</p>
    </article>
  );
};

export default ExportWorkouts;

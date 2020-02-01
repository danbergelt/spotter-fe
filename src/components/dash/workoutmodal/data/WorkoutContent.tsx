import React, { memo } from 'react';
import WorkoutData from './WorkoutData';
import WorkoutOptions from '../optionsmenu/WorkoutOptions';

interface Props {
  closeModal: () => void;
  time: number;
}

// container to hold data (e.g. notes, exercises, etc.) and options (e.g. tag modal, save template, delete workout, etc.)

const WorkoutContent: React.FC<Props> = ({ closeModal, time }) => {
  return (
    <div className='workout-body-container'>
      <WorkoutData />
      <WorkoutOptions closeParentModal={closeModal} time={time} />
    </div>
  );
};

export default memo(WorkoutContent);

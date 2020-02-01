import React from 'react';
import { useDispatch } from 'react-redux';
import { resetQueueAction } from '../../../../../actions/workoutActions';
import { Action } from 'redux';

// button that clears the edit queue
// also serves to notify the user that the form is in an edit state

const ClearEditQueue: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div
      role='button'
      onClick={(): Action => dispatch(resetQueueAction())}
      className='workout-data-exercises-editing'
    >
      Clear
    </div>
  );
};

export default ClearEditQueue;

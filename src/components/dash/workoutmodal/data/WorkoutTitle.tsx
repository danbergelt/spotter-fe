import React from 'react';
import { FiX } from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addTitleAction } from '../../../../actions/workoutActions';
import { State } from 'src/types/State';
import { Action } from 'redux';

interface Props {
  closeModal: () => void;
}

const WorkoutTitle: React.FC<Props> = ({ closeModal }) => {
  const title: string = useSelector(
    (state: State) => state.workoutReducer.title
  );

  const dispatch = useDispatch();

  return (
    <section className='workout-modal-head'>
      <div className='workout-modal-head-left'>
        <FaCircle className='workout-spotter-logo' />
        <input
          data-testid='inp'
          placeholder={'Click to enter a title...'}
          value={title}
          onChange={(e): Action => dispatch(addTitleAction(e.target.value))}
          className='workout-title'
        />
      </div>
      <div role='button' onClick={closeModal} className='workout-exit-modal'>
        <FiX data-testid='exit-modal' />
      </div>
    </section>
  );
};

export default WorkoutTitle;

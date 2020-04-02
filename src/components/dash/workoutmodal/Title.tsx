import React from 'react';
import Flex from 'src/components/lib/Flex';
import styles from './Title.module.scss';
import { FaCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'src/types';
import { Action } from 'redux';
import { FiX } from 'react-icons/fi';
import { addTitleAction } from 'src/actions/workoutActions';

/*== Modal title =====================================================

The workout title as it appears on the workout modal. Renders as input
element so title can be edited onClick. 

Also includes an exit button so user can exit the modal. 
Currently the exit button is the only way to exit the modal. 
This is to avoid UX issues where the user accidentally clicks the overlay 
and quits a workout while they are editing/filling it out. 

Props:
  closeModal: function
    the function that closes the workout modal

*/

interface Props {
  closeModal: () => void;
}

const Title: React.FC<Props> = ({ closeModal }) => {
  // the workout title stored in state
  const title: string = useSelector(
    (state: State) => state.workoutReducer.title
  );

  // state dispatcher
  const dispatch = useDispatch();

  return (
    <Flex align='center' justify='space-between'>
      <Flex align='center' css={styles.left}>
        <FaCircle className={styles.logo} />
        <input
          data-testid='inp'
          placeholder='Click to enter a title...'
          value={title}
          onChange={(e): Action => dispatch(addTitleAction(e.target.value))}
          className={styles.title}
        />
      </Flex>
      <div role='button' onClick={closeModal} className={styles.exit}>
        <FiX data-testid='exit-modal' />
      </div>
    </Flex>
  );
};

export default Title;

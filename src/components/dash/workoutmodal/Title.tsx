import React from 'react';
import Flex from 'src/components/lib/Flex';
import styles from './Title.module.scss';
import { FaCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'src/types/State';
import { Action } from 'redux';
import { FiX } from 'react-icons/fi';
import { addTitleAction } from 'src/actions/workoutActions';

interface Props {
  closeModal: () => void;
}

const Title: React.FC<Props> = ({ closeModal }) => {
  const title: string = useSelector(
    (state: State) => state.workoutReducer.title
  );

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

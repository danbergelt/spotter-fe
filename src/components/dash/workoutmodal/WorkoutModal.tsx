import React, { memo } from 'react';
import Modal from 'react-modal';
import styles from './WorkoutModal.module.scss';
import Flex from 'src/components/lib/Flex';
import { useWindowSize } from 'react-use';
import Menu from './menu/Menu';
import Tags from './Tags';
import Title from './Title';
import Notes from './Notes';
import Exercises from './Exercises';

/*== workout modal =====================================================

The modal component that allows a user to edit a workout and add a new
workout. Modal provided courtesy of https://www.npmjs.com/package/react-modal

Props:
  modal: boolean
    the open/close state of the modal
  closeModal: function
    a function that closes the modal and resets the various modal sub-states

*/

// react modal chore, modal must mount differently in JSDom environment
// see more here https://github.com/reactjs/react-modal/issues/632
if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

interface Props {
  modal: boolean;
  closeModal: () => void;
}

const WorkoutModal: React.FC<Props> = ({ modal, closeModal }) => {
  // adjust modal size at different viewport widths
  const { width } = useWindowSize();

  // dynamically adjust modal size
  const setModalSize = (): string => {
    if (width <= 800) {
      return '95%';
    } else {
      return '750px';
    }
  };

  return (
    // modal component. using inline styles to retain defaults
    // using a classname overrides defaults (which I don't want)
    <Modal
      style={{
        content: {
          width: setModalSize(),
          margin: '0 auto',
          background: '#f2f2f2',
          border: 0,
          padding: width <= 800 ? '10px' : '20px',
          left: width <= 800 ? '2.5%' : '40px'
        }
      }}
      contentLabel='Add Workout Modal'
      isOpen={modal}
      data-testid='modal'
    >
      <Flex fd='column' css={styles.content}>
        <Title closeModal={closeModal} />
        <Flex justify='space-between' fd={width <= 800 ? 'column' : undefined}>
          <div className={styles.data}>
            <Tags />
            <Notes />
            <Exercises />
          </div>
          <Menu closeParentModal={closeModal} />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default memo(WorkoutModal);

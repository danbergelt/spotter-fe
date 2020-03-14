import React, { memo } from 'react';
import Modal from 'react-modal';
import styles from './WorkoutModal.module.scss';
import Flex from 'src/components/lib/Flex';
import { useWindowSize } from 'react-use';
import WorkoutOptions from './optionsmenu/WorkoutOptions';
import Tags from './Tags';
import WorkoutExercises from './data/exercises/WorkoutExercises';
import Title from './Title';
import Notes from './Notes';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

interface Props {
  modal: boolean;
  closeModal: () => void;
  time: number;
}

const WorkoutModal: React.FC<Props> = ({ modal, closeModal, time }) => {
  const { width } = useWindowSize();

  const sizes = {
    large: '750px',
    largeMedium: '585px',
    medium: '450px',
    small: '300px'
  };

  const setModalSize = (): string => {
    if (width <= 500) {
      return sizes.small;
    } else if (width <= 650) {
      return sizes.medium;
    } else if (width <= 800) {
      return sizes.largeMedium;
    } else {
      return sizes.large;
    }
  };

  return (
    <Modal
      style={{
        content: {
          width: setModalSize(),
          margin: '0 auto',
          background: '#f2f2f2',
          border: 0,
          padding: width <= 500 ? '10px' : '20px'
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
            <WorkoutExercises />
          </div>
          <WorkoutOptions time={time} closeParentModal={closeModal} />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default memo(WorkoutModal);

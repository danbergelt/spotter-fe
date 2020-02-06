import React, { useState, memo } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useExerciseModalStyles } from './styles';
import ExercisesHead from './ExercisesHead';
import ManageExercises from './ManageExercises';
import AddExercises from './AddExercises';
import { State } from 'src/types/State';
import { Exercise, Msg } from '../../../../../../types/ExerciseOption';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

interface Props {
  setExercisesModal: (state: boolean) => void;
}

const Exercises: React.FC<Props> = ({ setExercisesModal }) => {
  const modalState: boolean = useSelector(
    (state: State) => state.optionsReducer.exercises
  );

  const savedExercises: Array<Exercise> = useSelector(
    (state: State) => state.fetchExercisesReducer.savedExercises
  );

  const [tab, setTab] = useState<number>(0);
  const [msg, setMsg] = useState<Msg>({});

  // clear modal state on close
  const handleCloseExerciseModal = (): void => {
    setExercisesModal(false);
    setTab(0);
    setMsg({});
  };

  const styles = useExerciseModalStyles();

  return (
    <Modal
      style={
        tab === 1
          ? // shrinks the size of the modal depending on the tab
            { ...styles, content: { ...styles.content, height: 'max-content' } }
          : styles
      }
      isOpen={modalState}
      contentLabel='Saved Exercises'
      onRequestClose={(): void => handleCloseExerciseModal()}
    >
      <section className='exercises-container'>
        <ExercisesHead
          tab={tab}
          setTab={setTab}
          handleCloseExerciseModal={handleCloseExerciseModal}
        />
        {tab === 0 && <ManageExercises exercises={savedExercises} />}
        {tab === 1 && <AddExercises msg={msg} setMsg={setMsg} />}
      </section>
    </Modal>
  );
};

export default memo(Exercises);

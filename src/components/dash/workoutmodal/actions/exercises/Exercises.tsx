import React, { useState, memo, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useExerciseModalStyles } from './styles';
import ExercisesHead from './ExercisesHead';
import ManageExercises from './ManageExercises';
import AddExercises from './AddExercises';
import { State } from 'src/types/State';
import { Exercise, Msg } from '../../../../../types/ExerciseOption';
import useApi from 'src/hooks/useApi';
import useToken from 'src/hooks/useToken';
import { fetchExercisesAction } from 'src/actions/fetchExercisesActions';
import { fetchExercisesQuery } from 'src/utils/queries';

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
  const t = useToken();
  const [tab, setTab] = useState<number>(0);
  const [msg, setMsg] = useState<Msg>({});
  const [res, call] = useApi();
  const dispatch = useDispatch();
  // clear modal state on close
  const handleCloseExerciseModal = (): void => {
    setExercisesModal(false);
    setTab(0);
    setMsg({});
  };
  const styles = useExerciseModalStyles();

  // on fetch exercises query result, either dispatch data or display error
  useEffect(() => {
    if (res.data) {
      dispatch(fetchExercisesAction(res.data.exercises));
    }

    if (res.error) {
      // handle later
    }
  }, [res, dispatch]);

  // fetch exercises on modal render
  useEffect(() => {
    if (modalState) {
      call(fetchExercisesQuery, [t]);
    }
  }, [call, t, modalState]);

  return (
    <Modal
      style={
        tab === 1
          ? // shrinks the size of the modal depending on the tab
            { ...styles, content: { ...styles.content, height: '200px' } }
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

import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteWorkoutAction } from 'src/actions/fetchWorkoutsActions';
import useToken from '../../../../../../../hooks/useToken';

interface Props {
  closeConfirmDelete: () => void;
  closeParentModal: () => void;
  workoutId: string | null;
}

const ConfirmDeleteBody: React.FC<Props> = ({
  closeConfirmDelete,
  closeParentModal,
  workoutId
}) => {
  const token: string | null = useToken();
  const dispatch = useDispatch();

  const deleteWorkout: () => void = () => {
    if (workoutId) {
      dispatch(deleteWorkoutAction(token, workoutId));
      closeConfirmDelete();
      closeParentModal();
    }
  };

  return (
    <>
      <p style={{ fontSize: '1.3rem' }}>
        Are you sure you want to delete this workout? There is no undoing this
        action.
      </p>
      <section className='delete-btn-container'>
        <div
          data-testid='conf-del'
          onClick={deleteWorkout}
          className='delete-btn del'
        >
          Delete
        </div>
        <div
          role='button'
          onClick={closeConfirmDelete}
          className='delete-btn can'
        >
          Cancel
        </div>
      </section>
    </>
  );
};

export default memo(ConfirmDeleteBody);

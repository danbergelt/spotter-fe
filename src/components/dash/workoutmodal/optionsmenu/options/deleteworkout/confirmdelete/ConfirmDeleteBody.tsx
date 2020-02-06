import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToken } from 'src/types/State';
import { deleteWorkoutAction } from 'src/actions/fetchWorkoutsActions';

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
  const t: string | null = useSelector(fetchToken);
  const dispatch = useDispatch();

  const deleteWorkout: () => void = () => {
    if (workoutId) {
      dispatch(deleteWorkoutAction(t, workoutId));
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

import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteWorkoutAction } from 'src/actions/fetchWorkoutsActions';
import useToken from '../../../../../../../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { deleteWorkoutQuery } from 'src/utils/queries';

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
  const token = useToken();
  const dispatch = useDispatch();
  const [res, call] = useApi();

  // actions subsequent to delete workout call
  useEffect(() => {
    // if successful, delete workout from store and close both open modals
    if (res.data) {
      dispatch(deleteWorkoutAction(res.data.workout._id));
      closeConfirmDelete();
      closeParentModal();
    }

    if (res.error) {
      // handle error later
    }
  }, [res, dispatch, closeConfirmDelete, closeParentModal]);

  // delete workout
  const deleteWorkout = async (): Promise<void> => {
    if (workoutId) {
      await call(deleteWorkoutQuery, [token, workoutId]);
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

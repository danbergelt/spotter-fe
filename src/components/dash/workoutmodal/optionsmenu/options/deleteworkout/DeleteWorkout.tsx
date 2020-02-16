import React, { memo } from 'react';
import { FiDelete } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import ConfirmDelete from './confirmdelete/ConfirmDelete';
import { setConfirmDeleteAction } from '../../../../../../actions/optionsActions';

interface Props {
  closeParentModal: () => void;
  workoutId: string | null;
  ctx: string | null;
  iconClass: string;
}

// delete workout option container
const DeleteWorkout: React.FC<Props> = ({
  closeParentModal,
  workoutId,
  ctx,
  iconClass
}) => {
  const dispatch = useDispatch();

  // references global modal context to determine behavior of delete workout button
  // either simply closes the modal or deletes the workout from the DB
  const delHandler: () => void = () => {
    return ctx === 'view'
      ? dispatch(setConfirmDeleteAction(true))
      : closeParentModal();
  };

  return (
    <>
      <div
        role='button'
        data-testid='del-workout'
        onClick={delHandler}
        className='add-workout-options-button delete'
      >
        <FiDelete className={iconClass} /> Delete
      </div>
      <ConfirmDelete
        closeParentModal={closeParentModal}
        workoutId={workoutId}
      />
    </>
  );
};

export default memo(DeleteWorkout);

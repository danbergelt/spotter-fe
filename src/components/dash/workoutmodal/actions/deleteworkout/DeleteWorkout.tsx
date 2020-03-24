import React, { memo, useState, useRef, useEffect } from 'react';
import { FiDelete } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import styles from './DeleteWorkout.module.scss';
import { State } from 'src/types/State';
import Dropdown from 'src/components/lib/Dropdown';
import Head from 'src/components/lib/Head';
import { deleteWorkoutQuery } from 'src/utils/queries';
import useApi from 'src/hooks/useApi';
import { deleteWorkoutAction } from 'src/actions/fetchWorkoutsActions';
import Button from 'src/components/lib/Button';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import useToken from 'src/hooks/useToken';

/*== Delete workout action =====================================================

This component allows a user to delete a workout. If the context is 'add', it simply
closes the modal, since that will delete the current draft. If the context is 'view',
it opens a dropdown asking the user to confirm. Once the user confirms, the workout is
deleted, and the user is routed back to the dashboard.

Props:
  closeParentModal: function
    close the workout modal
  workoutId: string
    the currentw workout's id, which is passed in to the delete query
  nudgeLeft: function
    dynamically nudge popup left on small viewports
  nudgeBottom: function
    dynamically nudge popup from bottom on small viewports

*/

interface Props {
  closeParentModal: () => void;
  workoutId: string | null;
  nudgeLeft: () => string | undefined;
  nudgeBottom: () => string | undefined;
}

// delete workout option container
const DeleteWorkout: React.FC<Props> = ({
  closeParentModal,
  workoutId,
  nudgeLeft,
  nudgeBottom
}) => {
  // dropdate state
  const [isOpen, setIsOpen] = useState(false);

  // trigger ref
  const ref = useRef<HTMLDivElement>(null);

  // api utils
  const [res, call, reset] = useApi();

  // state dispatcher
  const dispatch = useDispatch();

  // auth token
  const token = useToken();

  // the current modal context, either add or view
  const { ctx } = useSelector((state: State) => state.globalReducer);

  const deleteHandler = (): void => {
    // if viewing a workout, open a confirm delete popup
    if (ctx === 'add') {
      closeParentModal();
    }

    // otherwise, just close the modal
    if (ctx === 'view') {
      setIsOpen(!isOpen);
    }
  };

  // actions subsequent to delete workout call
  useEffect(() => {
    // if successful, delete workout from store and close both open modals
    if (res.data) {
      dispatch(deleteWorkoutAction(res.data.workout._id));
      setIsOpen(false);
      closeParentModal();
    }
  }, [res, dispatch, closeParentModal]);

  // delete workout
  const deleteWorkout = async (): Promise<void> => {
    await call(deleteWorkoutQuery, [token, workoutId]);
  };

  return (
    <>
      <div
        ref={ref}
        role='button'
        data-testid='del-workout'
        onClick={deleteHandler}
        className={styles.delete}
      >
        <FiDelete className={styles.icon} /> Delete
      </div>
      {isOpen && (
        <Dropdown
          bottom={nudgeBottom()}
          left={nudgeLeft()}
          css={styles.confirm}
          refs={[ref]}
          setState={setIsOpen}
        >
          <Head size={13} setState={setIsOpen} />
          <p className={styles.text}>
            Are you sure you want to delete this workout? There is no going
            back!
          </p>
          <Button css={styles.button} content='Delete' func={deleteWorkout} />
          <HTTPResponse css={styles.err} reset={reset} error={res.error} />
        </Dropdown>
      )}
    </>
  );
};

export default memo(DeleteWorkout);

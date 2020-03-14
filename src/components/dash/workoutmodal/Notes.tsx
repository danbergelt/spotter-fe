import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'src/types/State';
import { FiBookOpen, FiPlusCircle, FiTrash } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import { Action } from 'redux';
import styles from './Notes.module.scss';
import { addNotesAction, resetNotesAction } from 'src/actions/workoutActions';
import Flex from 'src/components/lib/Flex';

const Notes: React.FC = () => {
  // actions for saving/trashing notes in current workout
  const [actions, setActions] = useState(false);

  // focus the textarea as a side effect
  const notesRef = useRef<HTMLTextAreaElement>(null);

  // the notes in state
  const notes: string = useSelector(
    (state: State) => state.workoutReducer.notes
  );

  // state dispatcher
  const dispatch = useDispatch();

  // focuses the notes when the edit button is clicked
  const handleFocus: () => void = () => {
    if (notesRef?.current) {
      notesRef.current.focus();
    }
  };

  return (
    <section>
      <Flex align='center' css={styles.head}>
        <FiBookOpen className={styles.icon} />
        <p className={styles.title}>Notes</p>
        {notes && (
          <div
            role='button'
            className={styles.edit}
            onClick={(): void => handleFocus()}
          >
            Edit
          </div>
        )}
      </Flex>
      {/* textarea that grows with its content */}
      <TextareaAutosize
        inputRef={notesRef}
        onFocus={(): void => setActions(true)}
        onBlur={(): void => setActions(false)}
        value={notes}
        onChange={(e): Action => dispatch(addNotesAction(e.target.value))}
        className={styles.textarea}
        placeholder='Click to enter some notes...'
      />
      <section className={actions ? styles.on : styles.off}>
        <FiPlusCircle role='button' className={styles.save} />
        <FiTrash
          role='button'
          data-testid='trash'
          onMouseDown={(): Action => dispatch(resetNotesAction(''))}
          className={styles.trash}
        />
      </section>
    </section>
  );
};

export default Notes;

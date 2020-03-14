import React, { useState, useRef } from 'react';
import { FiPlusCircle, FiTrash } from 'react-icons/fi';
import { resetNotesAction } from '../../../../../actions/workoutActions';
import NotesTextArea from './NotesTextArea';
import NotesHead from './NotesHead';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'src/types/State';
import { AnyAction } from 'redux';

// misc. notes to include on a workout.
// can be anything worth noting that doesn't fit into a specific category

const WorkoutNotes: React.FC = () => {
  // actions include saving, deleting notes
  const [actions, setActions] = useState<boolean>(false);

  // ref for focusing on-demand
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const notes: string = useSelector(
    (state: State) => state.workoutReducer.notes
  );
  const dispatch = useDispatch();

  return (
    <section className='workout-data-notes'>
      <NotesHead notes={notes} notesRef={notesRef} />
      <NotesTextArea
        notesRef={notesRef}
        setActions={setActions}
        notes={notes}
      />
      <section
        className={
          actions
            ? 'workout-data-notes-actions active'
            : 'workout-data-notes-actions'
        }
      >
        <FiPlusCircle role='button' className='workout-data-notes-submit' />
        <FiTrash
          role='button'
          data-testid='trash'
          onMouseDown={(): AnyAction => dispatch(resetNotesAction(''))}
          className='workout-data-notes-cancel'
        />
      </section>
    </section>
  );
};

export default WorkoutNotes;

import React from 'react';
import { FiBookOpen } from 'react-icons/fi';
import { NotesProps as Props } from '../../../../../types/Notes';

const NotesHead: React.FC<Props> = ({ notes, notesRef }) => {
  // focuses the notes when the edit button is clicked
  const handleFocus: () => void = () => {
    if (notesRef?.current) {
      notesRef.current.focus();
    }
  };

  return (
    <header className='workout-data-notes-head'>
      <FiBookOpen className='workout-data-notes-icon' />
      <p className='workout-data-notes-title'>Notes</p>
      {notes !== '' && (
        <div
          role='button'
          className='workout-data-notes-edit'
          onClick={(): void => handleFocus()}
        >
          Edit
        </div>
      )}
    </header>
  );
};

export default NotesHead;

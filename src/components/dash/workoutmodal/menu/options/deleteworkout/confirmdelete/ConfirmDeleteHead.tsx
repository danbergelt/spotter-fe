import React, { memo } from 'react';
import { FiX } from 'react-icons/fi';

interface Props {
  closeConfirmDelete: () => void;
}

const ConfirmDeleteHead: React.FC<Props> = ({ closeConfirmDelete }) => {
  return (
    <div className='delete-head-container'>
      <header className='delete-head'>Delete Workout</header>
      <div role='button' onClick={closeConfirmDelete} className='delete-exit'>
        <FiX
          data-testid='quit-template-save'
          style={{ display: 'flex', alignItems: 'center' }}
        />
      </div>
    </div>
  );
};

export default memo(ConfirmDeleteHead);

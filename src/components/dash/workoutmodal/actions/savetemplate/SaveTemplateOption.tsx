import React, { memo, useState } from 'react';
import SaveTemplate from './SaveTemplate';
import { FiSave } from 'react-icons/fi';

interface Props {
  iconClass: string;
}

// option button container, click to trigger opening of save-template modal
const SaveTemplateOption: React.FC<Props> = ({ iconClass }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        role='button'
        onClick={(): void => setModal(true)}
        data-testid='save-template'
        className='add-workout-options-button'
      >
        <FiSave className={iconClass} /> Template
      </div>
      <SaveTemplate modal={modal} setModal={setModal} />
    </>
  );
};

export default memo(SaveTemplateOption);

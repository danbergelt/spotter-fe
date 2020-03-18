import React, { memo } from 'react';
import { FiX } from 'react-icons/fi';

interface Props {
  closeHandler: () => void;
}

const SaveTemplateHead: React.FC<Props> = ({ closeHandler }) => {
  return (
    <section className='save-template-header'>
      <p className='save-template-title'>Save Template</p>
      <div onClick={closeHandler} role='button' className='save-template-exit'>
        <FiX
          data-testid='quit-template-save'
          style={{ display: 'flex', alignItems: 'center' }}
        />
      </div>
    </section>
  );
};

export default memo(SaveTemplateHead);

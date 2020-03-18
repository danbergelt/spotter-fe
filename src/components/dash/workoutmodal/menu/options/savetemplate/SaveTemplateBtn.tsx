import React, { memo } from 'react';

const SaveTemplateBtn: React.FC = () => {
  return (
    <button
      data-testid='submit-template'
      className='template-save-submit'
      type='submit'
      form='save'
    >
      Save
    </button>
  );
};

export default memo(SaveTemplateBtn);

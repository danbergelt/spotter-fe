import React, { memo } from 'react';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setTempName: React.Dispatch<React.SetStateAction<string>>;
  tempName: string;
}

const SaveTemplateForm: React.FC<Props> = ({
  handleSubmit,
  setTempName,
  tempName
}) => {
  return (
    <form
      data-testid='template-form'
      id='save'
      className='template-form'
      onSubmit={(e): void => handleSubmit(e)}
    >
      <input
        value={tempName}
        placeholder='Template name (must be unique)'
        onChange={(e): void => setTempName(e.target.value)}
        className='template-save-name'
      />
    </form>
  );
};

export default memo(SaveTemplateForm);

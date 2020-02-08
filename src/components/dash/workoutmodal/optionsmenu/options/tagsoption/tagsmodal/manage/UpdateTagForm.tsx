import React, { memo } from 'react';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  updateInput: string;
  setUpdateInput: React.Dispatch<React.SetStateAction<string>>;
}

const UpdateTagForm: React.FC<Props> = ({
  handleSubmit,
  updateInput,
  setUpdateInput
}) => {
  return (
    <form onSubmit={(e): void => handleSubmit(e)}>
      <input
        className='tag-manage-update-input'
        placeholder='Update tag name...'
        value={updateInput}
        onChange={(e): void => setUpdateInput(e.target.value)}
      />
      <button
        data-testid='save-tag'
        className='tag-manage-update-submit'
        type='submit'
      >
        Save
      </button>
    </form>
  );
};

export default memo(UpdateTagForm);

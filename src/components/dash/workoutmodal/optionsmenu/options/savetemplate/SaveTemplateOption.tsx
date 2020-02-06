import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import SaveTemplate from './SaveTemplate';
import { FiSave } from 'react-icons/fi';
import { setSaveTemplateModalAction } from '../../../../../../actions/optionsActions';

interface Props {
  iconClass: string;
}

// option button container, click to trigger opening of save-template modal
const SaveTemplateOption: React.FC<Props> = ({ iconClass }) => {
  const dispatch = useDispatch();

  const setTemplateSaveModal: (state: boolean) => void = useCallback(
    state => {
      dispatch(setSaveTemplateModalAction(state));
    },
    [dispatch]
  );

  return (
    <>
      <div
        role='button'
        onClick={(): void => setTemplateSaveModal(true)}
        data-testid='save-template'
        className='add-workout-options-button'
      >
        <FiSave className={iconClass} /> Template
      </div>
      <SaveTemplate close={setTemplateSaveModal} />
    </>
  );
};

export default memo(SaveTemplateOption);

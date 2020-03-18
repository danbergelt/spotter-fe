import React, { useState, useEffect, SetStateAction } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useSaveTemplateStyles } from './utils/styles';
import SaveTemplateMsg from './SaveTemplateMsg';
import SaveTemplateBtn from './SaveTemplateBtn';
import SaveTemplateForm from './SaveTemplateForm';
import SaveTemplateHead from './SaveTemplateHead';
import { State, WorkoutReducer } from 'src/types/State';
import useToken from '../../../../../../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { saveTemplateQuery } from 'src/utils/queries';

interface Props {
  modal: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
}

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

// save template modal body, including call to save template

const SaveTemplate: React.FC<Props> = ({ modal, setModal }) => {
  const token: string | null = useToken();
  const [tempName, setTempName] = useState<string>('');
  const [res, call] = useApi();
  const [message, setMessage] = useState<{ success?: string; error?: string }>(
    {}
  );
  const workout: WorkoutReducer = useSelector(
    (state: State) => state.workoutReducer
  );

  const closeHandler: () => void = () => {
    setModal(false);
    setMessage({});
    setTempName('');
  };

  // send message to user when save attempt resolves/rejects
  useEffect(() => {
    if (res.data) {
      setTempName('');
      setMessage({ success: 'Template created' });
    }

    if (res.error) {
      setMessage({ error: res.error });
    }
  }, [res]);

  // save template
  const handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async e => {
    e.preventDefault();
    await call(saveTemplateQuery, [token, tempName, workout]);
  };

  return (
    <Modal
      style={useSaveTemplateStyles()}
      onRequestClose={closeHandler}
      contentLabel='Save Template'
      isOpen={modal}
    >
      <section className='save-template-container'>
        <SaveTemplateHead closeHandler={closeHandler} />
        <SaveTemplateForm
          handleSubmit={handleSubmit}
          tempName={tempName}
          setTempName={setTempName}
        />
        <SaveTemplateBtn />
        {message.error && (
          <SaveTemplateMsg
            errOrSucc={'template-save error'}
            message={message.error}
            setMessage={setMessage}
          />
        )}
        {message.success && (
          <SaveTemplateMsg
            errOrSucc={'template-save success'}
            message={message.success}
            setMessage={setMessage}
          />
        )}
      </section>
    </Modal>
  );
};

export default SaveTemplate;

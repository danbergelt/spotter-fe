import React from 'react';
import { FiX } from 'react-icons/fi';

// displays err on bad API req, success on good API req

interface Props {
  errOrSucc: string;
  setMessage: React.Dispatch<
    React.SetStateAction<{
      success?: string;
      error?: string;
    }>
  >;
  message: string;
}

const SaveTemplateMsg: React.FC<Props> = ({
  errOrSucc,
  setMessage,
  message
}) => {
  return (
    <div className={errOrSucc}>
      {message}
      <div
        role='button'
        onClick={(): void => setMessage({})}
        style={{ fontSize: '1.2rem', cursor: 'pointer' }}
      >
        <FiX />
      </div>
    </div>
  );
};

export default SaveTemplateMsg;

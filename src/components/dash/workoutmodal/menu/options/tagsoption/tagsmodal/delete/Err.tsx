import React from 'react';
import { FiX } from 'react-icons/fi';

interface Props {
  err: string;
  setErr: React.Dispatch<React.SetStateAction<string>>;
}

const Err: React.FC<Props> = ({ err, setErr }) => {
  return (
    <div className='tag-delete-err'>
      {err}
      <div
        role='button'
        onClick={(): void => setErr('')}
        style={{ fontSize: '1.2rem', cursor: 'pointer' }}
      >
        <FiX />
      </div>
    </div>
  );
};

export default Err;

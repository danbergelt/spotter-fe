import React from 'react';
import { FiX } from 'react-icons/fi';
import { Msg } from '../../../../../types/ExerciseOption';

interface Props {
  errOrSucc: string;
  setMsg: React.Dispatch<React.SetStateAction<Msg>>;
  msg: string;
}

// displays err on bad API req, success on good API req

const SaveExerciseMsg: React.FC<Props> = ({ errOrSucc, setMsg, msg }) => {
  return (
    <div className={errOrSucc}>
      {msg}
      <div
        role='button'
        onClick={(): void => setMsg({})}
        style={{ fontSize: '1.2rem', cursor: 'pointer' }}
      >
        <FiX />
      </div>
    </div>
  );
};

export default SaveExerciseMsg;

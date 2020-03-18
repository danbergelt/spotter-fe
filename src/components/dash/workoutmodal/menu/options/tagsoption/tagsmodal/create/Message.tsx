import React from 'react';
import { FiX } from 'react-icons/fi';

interface Props {
  message: string;
  setMessage: React.Dispatch<
    React.SetStateAction<{
      success?: string;
      error?: string;
    }>
  >;
}

const Message: React.FC<Props> = ({ message, setMessage }) => {
  return (
    <section
      className={
        message !== 'New tag created'
          ? 'tag-creation failure'
          : 'tag-creation success'
      }
    >
      {message}
      <div
        role='button'
        onClick={(): void => setMessage({})}
        style={{ fontSize: '1.2rem', cursor: 'pointer' }}
      >
        <FiX />
      </div>
    </section>
  );
};

export default Message;

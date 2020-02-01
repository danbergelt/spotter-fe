import React from 'react';
import { FiX } from 'react-icons/fi';
import ChangeEmailForm from './ChangeEmailForm';

interface Props {
  setChangeEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeEmailContent: React.FC<Props> = ({ setChangeEmail }) => {
  return (
    <article className='change-container'>
      <section className='popover-head'>
        <div
          role='button'
          data-testid='close-popover'
          onClick={(): void => setChangeEmail(false)}
          className='close-popover'
        >
          <FiX />
        </div>
      </section>
      <ChangeEmailForm />
    </article>
  );
};

export default ChangeEmailContent;

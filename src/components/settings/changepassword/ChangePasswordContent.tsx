import React from 'react';
import { FiX } from 'react-icons/fi';
import ChangePasswordForm from './ChangePasswordForm';

interface Props {
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordContent: React.FC<Props> = ({ setChangePassword }) => {
  return (
    <article className='change-container'>
      <section className='popover-head'>
        <div
          role='button'
          data-testid='close-popover'
          onClick={(): void => setChangePassword(false)}
          className='close-popover'
        >
          <FiX />
        </div>
      </section>
      <ChangePasswordForm />
    </article>
  );
};

export default ChangePasswordContent;

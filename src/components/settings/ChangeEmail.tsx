import React from 'react';
import Popover from 'react-tiny-popover';
import styles from './ChangeAccount.module.scss';
import ChangeAccountForm from './ChangeAccountForm';
import { ChangeEmailSchema } from 'src/utils/validators';
import { changeEmailQuery } from 'src/utils/queries';

interface Props {
  changeEmail: boolean;
  setChangeEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeEmail: React.FC<Props> = ({ changeEmail, setChangeEmail }) => {
  const labels = {
    old: 'Old Email',
    new: 'New Email',
    confirm: 'Confirm Email'
  };

  return (
    <Popover
      isOpen={changeEmail}
      onClickOutside={(): void => setChangeEmail(false)}
      content={
        <ChangeAccountForm
          inputType='email'
          schema={ChangeEmailSchema}
          setState={setChangeEmail}
          api={changeEmailQuery}
          labels={labels}
        />
      }
      align='start'
      position='bottom'
      containerClassName={styles.popup}
    >
      <div
        role='button'
        onClick={(): void => setChangeEmail(true)}
        className={styles.action}
      >
        Change email...
      </div>
    </Popover>
  );
};

export default ChangeEmail;

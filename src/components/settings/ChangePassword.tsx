import React from 'react';
import Popover from 'react-tiny-popover';
import styles from './ChangeAccount.module.scss';
import ChangeAccountForm from './ChangeAccountForm';
import { ChangePasswordSchema } from 'src/utils/validators';
import { changePasswordQuery } from 'src/utils/queries';

interface Props {
  changePassword: boolean;
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePassword: React.FC<Props> = ({
  changePassword,
  setChangePassword
}) => {
  const labels = {
    old: 'Old Password',
    new: 'New Password',
    confirm: 'Confirm Password'
  };

  return (
    <Popover
      isOpen={changePassword}
      onClickOutside={(): void => setChangePassword(false)}
      content={
        <ChangeAccountForm
          inputType='password'
          schema={ChangePasswordSchema}
          setState={setChangePassword}
          api={changePasswordQuery}
          labels={labels}
        />
      }
      align='start'
      position='bottom'
      containerClassName={styles.popup}
    >
      <div
        role='button'
        onClick={(): void => setChangePassword(true)}
        className={styles.action}
      >
        Change password...
      </div>
    </Popover>
  );
};

export default ChangePassword;

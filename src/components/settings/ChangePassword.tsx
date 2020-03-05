import React from 'react';
import Popover from 'react-tiny-popover';
import styles from './ChangeAccount.module.scss';
import ChangeAccountForm from './ChangeAccountForm';
import { ChangePasswordSchema } from 'src/utils/validators';
import { changePasswordQuery } from 'src/utils/queries';

/*== Change password popup wrapper =====================================================

The popup for a user to change their password. Wraps the change account form. 

User clicks the "change password..." and loads the popup

Props
  changePassword: boolean
    the state that toggles the popup
  setChangePassword: React setStateAction
    the state setter that toggles the popup

*/

interface Props {
  changePassword: boolean;
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePassword: React.FC<Props> = ({
  changePassword,
  setChangePassword
}) => {
  // form labels, passed to child
  const labels = {
    old: 'Old Password',
    new: 'New Password',
    confirm: 'Confirm Password'
  };

  return (
    // TODO --> consider refactoring away from a third party and making your own component
    <Popover
      isOpen={changePassword}
      onClickOutside={(): void => setChangePassword(false)}
      // the content prop accepts the component to be rendered on popup open
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

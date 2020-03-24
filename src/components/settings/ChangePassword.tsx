import React, { useRef } from 'react';
import styles from './ChangeAccount.module.scss';
import ChangeAccountForm from './ChangeAccountForm';
import { ChangePasswordSchema } from 'src/utils/validators';
import { changePasswordQuery } from 'src/utils/queries';
import Dropdown from '../lib/Dropdown';

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

  const ref = useRef<HTMLParagraphElement>(null);

  return (
    <>
      <p
        ref={ref}
        role='button'
        onClick={(): void => setChangePassword(!changePassword)}
        className={styles.action}
      >
        Change password...
      </p>
      {changePassword && (
        <Dropdown
          css={styles.container}
          setState={setChangePassword}
          refs={[ref]}
        >
          <ChangeAccountForm
            inputType='password'
            schema={ChangePasswordSchema}
            setState={setChangePassword}
            api={changePasswordQuery}
            labels={labels}
          />
        </Dropdown>
      )}
    </>
  );
};

export default ChangePassword;

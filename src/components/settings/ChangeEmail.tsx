import React, { useRef } from 'react';
import styles from './ChangeAccount.module.scss';
import Dropdown from '../lib/Dropdown';
import ChangeAccountForm from './ChangeAccountForm';
import { ChangeEmailSchema } from 'src/utils/validators';
import { changeEmailQuery } from 'src/utils/queries';

/*== Change email popup wrapper =====================================================

The popup for a user to change their email. Wraps the change account form. 

User clicks the "change email..." and loads the popup

Props
  changeEmail: boolean
    the state that toggles the popup
  setChangeEmail: React setStateAction
    the state setter that toggles the popup

*/

interface Props {
  changeEmail: boolean;
  setChangeEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeEmail: React.FC<Props> = ({ changeEmail, setChangeEmail }) => {
  // form labels, passed to child
  const labels = {
    old: 'Old Email',
    new: 'New Email',
    confirm: 'Confirm Email'
  };

  // trigger ref for dropdown
  const ref = useRef<HTMLParagraphElement>(null);

  return (
    <>
      <p
        ref={ref}
        role='button'
        onClick={(): void => setChangeEmail(!changeEmail)}
        className={styles.action}
      >
        Change email...
      </p>
      {changeEmail && (
        <Dropdown
          css={styles.container}
          setState={setChangeEmail}
          triggerRef={ref}
        >
          <ChangeAccountForm
            inputType='email'
            schema={ChangeEmailSchema}
            setState={setChangeEmail}
            api={changeEmailQuery}
            labels={labels}
          />
        </Dropdown>
      )}
    </>
  );
};

export default ChangeEmail;

import React from 'react';
import Popover from 'react-tiny-popover';
import styles from './ChangeAccount.module.scss';
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

  return (
    // TODO --> consider refactoring away from a third party and making your own component
    <Popover
      isOpen={changeEmail}
      onClickOutside={(): void => setChangeEmail(false)}
      // the content prop accepts the component to be rendered on popup open
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

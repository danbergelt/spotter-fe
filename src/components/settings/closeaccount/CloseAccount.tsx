import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOutAction } from 'src/actions/globalActions';
// import { useHistory } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { deleteAccountQuery } from 'src/utils/queries';

const CloseAccount: React.FC = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const [confirmClose, setConfirmClose] = useState<boolean>(false);

  const t: string | null = useToken();

  const [res, call] = useApi();

  useEffect(() => {
    if (res.data) {
      dispatch(logOutAction());
    }

    if (res.error) {
      // no-op, handle error later
    }
  }, [res, dispatch]);

  const deleteAccount = async (): Promise<void> => {
    if (confirmClose) {
      await call(deleteAccountQuery, [t]);
    }
  };

  return (
    <article className='del-account-container'>
      <span id='del-account-danger'>Danger!</span> This action can&#39;t be
      undone. All of your data will be deleted, and you will be redirected to
      the Signup screen.
      <br />
      <br />
      Are you sure you want to close your account?
      <section className='confirm-close'>
        <input
          onChange={(): void => setConfirmClose(!confirmClose)}
          className='confirm-check'
          type='checkbox'
          data-testid='close-check'
        />
        <p>Yes, I&#39;m sure</p>
      </section>
      <div
        role='button'
        data-testid={
          confirmClose ? 'delete-account' : 'delete-account-disabled'
        }
        className={confirmClose ? 'delete-account' : 'delete-account-disabled'}
        onClick={deleteAccount}
      >
        Close Account
      </div>
    </article>
  );
};

export default CloseAccount;

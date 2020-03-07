import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOutAction } from 'src/actions/globalActions';
import useToken from '../../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { deleteAccountQuery } from 'src/utils/queries';
import Checkbox from 'src/components/util/Checkbox';
import HTTPResponse from '../util/HTTPResponse';
import styles from './CloseAccount.module.scss';
import Flex from '../util/Flex';
import Button from '../util/Button';

/*== Close Account =====================================================

  This component allows a user to permanently close their account.

  There is one layer of protection before a user can close their account.
  They must check the checkbox component, at which point the close account
  button becomes activated. They then can submit the request, get their
  account and associated data deleted permanently from the DB, and are 
  logged out of the client

*/

const CloseAccount: React.FC = () => {
  // store dispatcher
  const dispatch = useDispatch();

  // confirmation state --> when false, user can't close account
  const [confirmClose, setConfirmClose] = useState(false);

  // auth token
  const token: string | null = useToken();

  // api utilities
  const [res, call, reset] = useApi();

  // if account successfully closes, log out user
  useEffect(() => {
    if (res.data) {
      dispatch(logOutAction());
    }
  }, [res, dispatch]);

  // if confirmation state === true, call the close account query
  const deleteAccount = async (): Promise<void> => {
    if (confirmClose) {
      await call(deleteAccountQuery, [token]);
    }
  };

  return (
    <article className={styles.container}>
      <p className={styles.desc}>
        <span id={styles.danger}>Danger!</span> This action can&#39;t be undone.
        All of your data will be deleted, and you will be redirected to the
        Signup screen.
      </p>
      <p className={styles.question}>
        Are you sure you want to close your account?
      </p>
      <Flex align='center'>
        <Checkbox state={confirmClose} setState={setConfirmClose} />
        <p className={styles.confirm}>Yes, I&#39;m sure</p>
      </Flex>
      <HTTPResponse
        css={{ marginTop: '2rem', width: '275px', padding: '1rem' }}
        error={res.error}
        reset={reset}
      />
      <Button
        content='Close Account'
        loading={res.isLoading}
        func={deleteAccount}
        css={{
          cursor: !confirmClose ? 'not-allowed' : undefined,
          background: !confirmClose ? 'rgba(237, 61, 52, 0.7)' : undefined,
          marginTop: '2rem'
        }}
      />
    </article>
  );
};

export default CloseAccount;

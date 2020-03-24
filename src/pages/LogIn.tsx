import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as LogInLogo } from '../assets/spotter_login.svg';
import AuthForm from '../components/auth/AuthForm';
import { useDispatch } from 'react-redux';
import { addTokenAction } from 'src/actions/globalActions';
import { Helmet } from 'react-helmet-async';
import { logInQuery } from 'src/utils/queries';
import styles from './AuthPage.module.scss';

const LogIn: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const addToken = useCallback(
    (t: string): void => {
      dispatch(addTokenAction(t));
    },
    [dispatch]
  );

  return (
    <>
      <Helmet>
        <title>Log In | Spotter</title>
      </Helmet>
      <AuthForm
        history={history}
        api={logInQuery}
        action='Log In'
        addToken={addToken}
      >
        <LogInLogo
          data-testid='login-img'
          role='img'
          aria-label='Animated image of people working out'
          className={styles.logo}
        />
      </AuthForm>
    </>
  );
};

export default LogIn;

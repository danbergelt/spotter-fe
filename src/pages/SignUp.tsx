import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SignUpLogo } from '../assets/spotter_register.svg';
import AuthForm from '../components/auth/AuthForm';
import { useDispatch } from 'react-redux';
import { addTokenAction } from 'src/actions/globalActions';
import { Helmet } from 'react-helmet-async';
import { signUpQuery } from 'src/utils/queries';
import styles from './AuthPage.module.scss';

const SignUp: React.FC = () => {
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
        <title>Sign Up | Spotter</title>
      </Helmet>
      <AuthForm
        history={history}
        api={signUpQuery}
        action='Sign Up'
        addToken={addToken}
      >
        <SignUpLogo
          data-testid='signup-img'
          role='img'
          aria-label='Animated image of people working out'
          className={styles.logo}
        />
      </AuthForm>
    </>
  );
};

export default SignUp;

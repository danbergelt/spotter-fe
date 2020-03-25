import React from 'react';
import { ReactComponent as LogInLogo } from '../assets/spotter_login.svg';
import AuthForm from '../components/auth/AuthForm';
import { Helmet } from 'react-helmet-async';
import { logInQuery } from 'src/utils/queries';
import styles from './AuthPage.module.scss';

/*== Log in page =====================================================

This is the log in page for unauth'd users. Utilizes a generic auth
form that accepts slightly different props depending on context (log 
in or sign up)

*/

const LogIn: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Log In | Spotter</title>
      </Helmet>
      <AuthForm api={logInQuery} action='Log In'>
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

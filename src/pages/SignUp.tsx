import React from 'react';
import { ReactComponent as SignUpLogo } from '../assets/spotter_register.svg';
import AuthForm from '../components/auth/AuthForm';
import { Helmet } from 'react-helmet-async';
import { signUpQuery } from 'src/utils/queries';
import styles from './AuthPage.module.scss';

/*== Sign up page =====================================================

This is the sign up page for unauth'd users. Utilizes a generic auth
form that accepts slightly different props depending on context (log 
in or sign up)

*/

const SignUp: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up | Spotter</title>
      </Helmet>
      <AuthForm api={signUpQuery} action='Sign Up'>
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

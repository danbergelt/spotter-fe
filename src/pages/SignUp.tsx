import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SignUpLogo } from '../assets/spotter_register.svg';
import Form from '../components/auth/Form';
import { useDispatch } from 'react-redux';
import { addTokenAction } from 'src/actions/globalActions';
import { Helmet } from 'react-helmet-async';
import { api } from '../utils/api';

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
      <Form
        history={history}
        api={`${api()}/api/auth/register`}
        action='Sign Up'
        addToken={addToken}
      >
        <SignUpLogo
          data-testid='signup-img'
          role='img'
          aria-label='Animated image of people working out'
          className='form-logo'
        />
      </Form>
    </>
  );
};

export default SignUp;

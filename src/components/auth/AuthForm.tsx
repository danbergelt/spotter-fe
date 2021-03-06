import React, { ReactNode, useEffect } from 'react';
import { Form, Field, Formik } from 'formik';
import styles from './AuthForm.module.scss';
import { AuthSchema } from '../../utils/validators';
import useApi from 'src/hooks/useApi';
import HTTPResponse from '../lib/HTTPResponse';
import Label from '../lib/Label';
import Input from '../lib/Input';
import FormError from '../lib/FormError';
import Button from '../lib/Button';
import AltLink from '../lib/AltLink';
import Flex from '../lib/Flex';
import { useHistory } from 'react-router-dom';
import { addTokenAction } from 'src/actions/globalActions';
import { useDispatch } from 'react-redux';

/*== Auth form =====================================================

This component is the form used for both log in and sign up processes

Accepts props that determine which context this will be used for

Props:
  action: string
    Either "log out" or "sign up"
  api: function
    Either a log in api call or sign up api call
  history: History
    On successful request, push user to their dashboard
  children:
    Used to render an SVG image, which will differ depending on context
  addToken: function
    A callback that stores the token (on successful request) to memory

*/

interface Props {
  action: string;
  api: Function;
  children: ReactNode;
}

const AuthForm: React.FC<Props> = ({ action, api, children }) => {
  // api resources
  const [res, call, reset] = useApi();

  // history object to push user
  const history = useHistory();

  // state dispatcher
  const dispatch = useDispatch();

  // on successful request, save the token and push user to dashboard
  useEffect(() => {
    if (res.data) {
      dispatch(addTokenAction(res.data.token));
      history.push('/dashboard');
    }
  }, [res, dispatch, history]);

  return (
    <section className={styles.container}>
      {/* the logo passed by parent */}
      <div className={styles.logoContainer}>
        <div>{children}</div>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={AuthSchema}
        // call the api
        onSubmit={async (values): Promise<void> => {
          await call(api, [values]);
        }}
      >
        {({ errors, touched }): JSX.Element => (
          <section className={styles.formContainer}>
            <h1 className={styles.title}>{action}</h1>
            <HTTPResponse reset={reset} error={res.error} />
            <Form data-testid='test-form' className={styles.form}>
              <Flex justify='space-between'>
                <Label content='Email' input='email' />
                <FormError touched={touched} errors={errors} node='email' />
              </Flex>
              <Field
                as={Input}
                name='email'
                placeholder='name@email.com'
                type='email'
              />
              <Flex justify='space-between'>
                <Label content='Password' input='password' />
                <FormError touched={touched} errors={errors} node='password' />
              </Flex>
              <Field
                as={Input}
                name='password'
                placeholder='Password'
                type='password'
              />
              <Button
                css={styles.btn}
                content={action}
                loading={res.isLoading}
              />
            </Form>
            {action === 'Sign Up' && (
              <AltLink
                content='Already have an account?'
                path='/login'
                linkContent='Log in.'
              />
            )}
            {action === 'Log In' && (
              <AltLink
                content='Forgot your password?'
                path='/forgotpassword'
                linkContent='Click here.'
              />
            )}
          </section>
        )}
      </Formik>
    </section>
  );
};

export default AuthForm;

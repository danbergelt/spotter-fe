import React, { memo, ReactNode, useEffect } from 'react';
import { Form, Field, Formik } from 'formik';
import styles from './AuthForm.module.scss';
import { History } from 'history';
import { AuthSchema } from '../../utils/validators';
import useApi from 'src/hooks/useApi';
import HTTPResponse from '../util/HTTPResponse';
import Label from '../util/Label';
import Input from '../util/Input';
import FormError from '../util/FormError';
import Button from '../util/Button';
import AltLink from '../util/AltLink';
import Flex from '../util/Flex';

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
  history: History;
  children: ReactNode;
  addToken: (t: string) => void;
}

const AuthForm: React.FC<Props> = ({
  action,
  api,
  history,
  children,
  addToken
}) => {
  // api resources
  const [res, call, reset] = useApi();

  // on successful request, save the token and push user to dashboard
  useEffect(() => {
    if (res.data) {
      addToken(res.data.token);
      history.push('/dashboard');
    }
  }, [res, addToken, history]);

  return (
    <section className={styles.container}>
      {/* the logo passed by parent */}
      <div className={styles.logoContainer}>
        <div>{children}</div>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={AuthSchema}
        // on submit, reset the form and call the api
        onSubmit={async (values, { resetForm }): Promise<void> => {
          resetForm();
          await call(api, [values]);
        }}
      >
        {({ errors, touched }): JSX.Element => (
          <section className={styles.formContainer}>
            <h1 className={styles.title}>{action}</h1>
            <HTTPResponse reset={reset} error={res.error} />
            <Form data-testid='test-form' className={styles.form}>
              <Flex sb>
                <Label content='Email' input='email' />
                <FormError touched={touched} errors={errors} node='email' />
              </Flex>
              <Field
                as={Input}
                name='email'
                placeholder='name@email.com'
                type='email'
              />
              <Flex sb>
                <Label content='Password' input='password' />
                <FormError touched={touched} errors={errors} node='password' />
              </Flex>
              <Field
                as={Input}
                name='password'
                placeholder='Password'
                type='password'
              />
              <Button content={action} loading={res.isLoading} />
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

export default memo(AuthForm);

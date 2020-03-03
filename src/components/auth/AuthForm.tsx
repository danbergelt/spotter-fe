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

// shared component for login + signup forms

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
  const [res, call, reset] = useApi();

  useEffect(() => {
    if (res.data) {
      addToken(res.data.token);
      history.push('/dashboard');
    }
  }, [res, addToken, history]);

  return (
    <section className={styles.container}>
      <div className={styles.logoContainer}>
        <div>{children}</div>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={AuthSchema}
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
              <div className={styles.flex}>
                <Label content='Email' input='email' />
                <FormError touched={touched} errors={errors} node='email' />
              </div>
              <Field
                as={Input}
                name='email'
                placeholder='name@email.com'
                type='email'
              />
              <div className={styles.flex}>
                <Label content='Password' input='password' />
                <FormError touched={touched} errors={errors} node='password' />
              </div>
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

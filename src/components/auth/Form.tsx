import React, { ReactNode, memo } from 'react';
import { Form, Field, Formik } from 'formik';
import axios from 'axios';
import { History } from 'history';
import { Link } from 'react-router-dom';
import { ValidationSchema } from './ValidationSchema';

// shared component for login + signup forms

interface Props {
  action: string;
  api: string;
  history: History;
  children: ReactNode;
  addToken: (t: string) => void;
}

const SpotterForm: React.FC<Props> = ({
  action,
  api,
  history,
  children,
  addToken
}) => {
  return (
    <section className='form-container'>
      <div className='logo-container'>
        <div>{children}</div>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm, setStatus }): Promise<void> => {
          try {
            const res = await axios.post(api, values, {
              withCredentials: true
            });
            resetForm();
            addToken(res.data.token);
            history.push('/dashboard');
          } catch (error) {
            if (error.response) {
              setStatus(error.response.data.error);
            } else {
              setStatus('Server error, try again later');
            }
          }
        }}
      >
        {({ status, errors, touched }): JSX.Element => (
          <section className='form-sub-container'>
            <header className='form-head'>{action}</header>
            {status && <p className='api-err-box'>{status}</p>}
            <Form data-testid='test-form' className='form'>
              <label className='form-label'>Email</label>
              <Field
                className='form-field'
                name='email'
                placeholder='name@email.com'
                type='email'
              />
              {touched.email && errors.email && (
                <p className='form-error email'>{errors.email}</p>
              )}
              <label className='form-label'>Password</label>
              <Field
                className='form-field'
                name='password'
                placeholder='Password'
                type='password'
              />
              {touched.password && errors.password && (
                <p className='form-error pass'>{errors.password}</p>
              )}
              <button
                data-testid='form-submit'
                className='form-button'
                type='submit'
              >
                {action}
              </button>
            </Form>
            {action === 'Sign Up' && (
              <section className='form-alt-link'>
                Already have an account?{' '}
                <Link className='form-alt-link-clickable' to='/login'>
                  Log in.
                </Link>
              </section>
            )}
            {action === 'Log In' && (
              <section className='form-alt-link'>
                Forgot your password?{' '}
                <Link className='form-alt-link-clickable' to='/forgotpassword'>
                  Click here.
                </Link>
              </section>
            )}
          </section>
        )}
      </Formik>
    </section>
  );
};

export default memo(SpotterForm);

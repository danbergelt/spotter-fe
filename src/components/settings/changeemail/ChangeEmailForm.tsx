import React from 'react';
import { Formik, Form, Field } from 'formik';
import { ValidationSchema } from './ValidationSchema';
import axiosWithAuth from 'src/utils/axiosWithAuth';
import { useSelector } from 'react-redux';
import { fetchToken } from 'src/types/State';
import { api } from '../../../utils/api';

const ChangeEmailForm: React.FC = () => {
  const t: string | null = useSelector(fetchToken);

  return (
    <section className='change-form'>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          oldEmail: '',
          newEmail: '',
          confirmEmail: ''
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm, setStatus }): Promise<void> => {
          resetForm();
          try {
            const res = await axiosWithAuth(t).put(
              `${api()}/api/auth/user/email`,
              {
                ...values
              }
            );
            setStatus(res.data);
          } catch (error) {
            setStatus(error.response.data);
          }
        }}
      >
        {({ errors, touched, status }): JSX.Element => (
          <Form>
            <div className='change-inp'>
              <label className='change-label'>Old Email</label>
              <Field
                data-testid='old'
                className='inp-component'
                name='oldEmail'
              />
            </div>
            <div className='change-inp'>
              <label className='change-label'>New Email</label>
              <Field
                data-testid='new'
                className='inp-component'
                name='newEmail'
              />
            </div>
            <div className='change-inp'>
              <label className='change-label'>Confirm Email</label>
              <Field
                data-testid='confirm'
                className='inp-component'
                name='confirmEmail'
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <button
                data-testid='save'
                className='change-button'
                type='submit'
              >
                Save
              </button>
              {errors.confirmEmail && touched.confirmEmail && (
                <p className='change-err'>{errors.confirmEmail}</p>
              )}
              {status?.error && <p className='change-err'>{status.error}</p>}
              {status?.data && <p className='change-succ'>{status.data}</p>}
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ChangeEmailForm;

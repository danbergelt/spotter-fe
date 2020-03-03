import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { ChangeForgottenPasswordSchema } from '../utils/validators';
import FormError from 'src/components/util/FormError';
import useApi from 'src/hooks/useApi';
import { changeForgottenPasswordQuery } from 'src/utils/queries';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTokenAction } from 'src/actions/globalActions';
import HTTPResponse from 'src/components/util/HTTPResponse';
import styles from './ChangePassword.module.scss';
import Label from 'src/components/util/Label';
import Input from 'src/components/util/Input';
import Button from 'src/components/util/Button';
import { Helmet } from 'react-helmet-async';

/*== Change password page =====================================================

This page is used for unauthenticated users who have forgotten their password.

After sending a forgot password request, the user receives an email with a link
to this page. The slug is their reset password token that will be used to 
validate their request. The slug expires 10 minutes after being created. 

The user needs to enter a new password, confirm that new password, and submit a
request to change their password. If that request succeeds, the user is routed
to their dashboard. If it fails, an error message is displayed.

*/

const ChangePassword: React.FC = () => {
  // the slug/token
  const { id } = useParams();
  const [res, call, reset] = useApi();
  const dispatch = useDispatch();
  const history = useHistory();

  // if request is successful, save the token and push user to dashboard
  useEffect(() => {
    if (res.data) {
      dispatch(addTokenAction(res.data.token));
      history.push('/dashboard');
    }
  }, [res, dispatch, history]);

  return (
    <>
      <Helmet>
        <title>Change Password | Spotter</title>
      </Helmet>
      <Formik
        initialValues={{ newPassword: '', confirmPassword: '' }}
        validationSchema={ChangeForgottenPasswordSchema}
        // on submit, reset the form and send the request
        onSubmit={async (values, { resetForm }): Promise<void> => {
          resetForm();
          await call(changeForgottenPasswordQuery, [values, id]);
        }}
      >
        {({ errors, touched }): JSX.Element => (
          <section className={styles.container}>
            <h1 className={styles.title}>Change Password</h1>
            <HTTPResponse reset={reset} error={res.error} />
            <Form>
              <div className={styles.flex}>
                <Label content='New Password' input='newPassword' />
                <FormError
                  touched={touched}
                  errors={errors}
                  node='newPassword'
                />
              </div>
              <Field
                as={Input}
                name='newPassword'
                placeholder='New password'
                type='password'
              />
              <div className={styles.flex}>
                <Label content='Confirm Password' input='confirmPassword' />
                <FormError
                  touched={touched}
                  errors={errors}
                  node='confirmPassword'
                />
              </div>
              <Field
                as={Input}
                name='confirmPassword'
                placeholder='Confirm password'
                type='password'
              />
              <Button loading={res.isLoading} content='Submit' />
            </Form>
          </section>
        )}
      </Formik>
    </>
  );
};

export default ChangePassword;

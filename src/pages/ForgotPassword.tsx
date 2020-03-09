import React from 'react';
import { Formik, Field, Form } from 'formik';
import Button from 'src/components/lib/Button';
import { ForgotPasswordSchema } from 'src/utils/validators';
import Input from 'src/components/lib/Input';
import styles from './ChangePassword.module.scss';
import useApi from 'src/hooks/useApi';
import { forgotPasswordQuery } from 'src/utils/queries';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import Label from 'src/components/lib/Label';
import FormError from 'src/components/lib/FormError';
import { Helmet } from 'react-helmet-async';
import Flex from 'src/components/lib/Flex';

/*== Forgot Password =====================================================

This page triggers a forgot password request on behalf of the user.

The user enters their email address, submits the form, and receives an email 
that contains a link to a new page where they can change their password.

Included in that link as a slug is the user's forgot password token. Every
request generates a unique token, and can only be used for that user and on
that specific request. Each token expires after 10 minutes.

*/

const ForgotPassword: React.FC = () => {
  const [res, call, reset] = useApi();

  return (
    <>
      <Helmet>
        <title>Forgot Password | Spotter</title>
      </Helmet>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        // on submit, reset the form and send the query
        onSubmit={async (values, { resetForm }): Promise<void> => {
          resetForm();
          await call(forgotPasswordQuery, [values.email]);
        }}
      >
        {({ errors, touched }): JSX.Element => (
          <section className={styles.container}>
            <h1 className={styles.title}>Forgot your password?</h1>
            <HTTPResponse
              reset={reset}
              error={res.error}
              success={res.data?.message}
            />
            <Form>
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
              <Button
                css={{ width: '100%' }}
                loading={res.isLoading}
                content='Send Instructions'
              />
            </Form>
          </section>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;

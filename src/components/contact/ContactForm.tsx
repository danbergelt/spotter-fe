import React from 'react';
import { Form, Field, Formik } from 'formik';
import { ContactSchema } from '../../utils/validators';
import { contactQuery } from '../../utils/queries';
import useApi from 'src/hooks/useApi';
import HTTPResponse from '../util/HTTPResponse';
import styles from './ContactForm.module.scss';
import Label from '../util/Label';
import FormError from '../util/FormError';
import Input from '../util/Input';
import Button from '../util/Button';

const ContactForm: React.FC = () => {
  const [res, call, reset] = useApi();

  return (
    <Formik
      initialValues={{ name: '', email: '', subject: '', message: '' }}
      validationSchema={ContactSchema}
      onSubmit={async (values, { resetForm }): Promise<void> => {
        resetForm();
        await call(contactQuery, [values]);
      }}
    >
      {({
        errors,
        touched,
        setFieldValue,
        values,
        handleBlur,
        isSubmitting
      }): JSX.Element => (
        <Form>
          <HTTPResponse
            error={res.error}
            success={res.data && res.data.message}
            reset={reset}
          />
          <section className={styles.container}>
            <div className={styles.flex}>
              <Label content='Name' input='name' />
              <FormError touched={touched} errors={errors} node='name' />
            </div>
            <Field as={Input} placeholder='Jane Doe' type='text' name='name' />
            <div className={styles.flex}>
              <Label content='Email' input='email' />
              <FormError touched={touched} errors={errors} node='email' />
            </div>
            <Field
              as={Input}
              placeholder='name@email.com'
              type='email'
              name='email'
            />
            <div className={styles.flex}>
              <Label content='Subject' input='subject' />
              <FormError touched={touched} errors={errors} node='subject' />
            </div>
            <Field
              placeholder='e.g. feature request'
              as={Input}
              type='text'
              name='subject'
            />
            <div className={styles.flex}>
              <Label content='Message' input='message' />
              <FormError touched={touched} errors={errors} node='message' />
            </div>
            <textarea
              name='message'
              onBlur={handleBlur}
              value={values.message}
              onChange={(e): void => setFieldValue('message', e.target.value)}
              placeholder='Your message goes here...'
              className='contact-form-message'
            />
            <Button content='Submit' loading={res.isLoading} />
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;

import React from 'react';
import { Form, Field, Formik } from 'formik';
import { ContactSchema } from '../../utils/validators';
import { contactQuery } from '../../utils/queries';
import useApi from 'src/hooks/useApi';
import HTTPResponse from '../lib/HTTPResponse';
import styles from './ContactForm.module.scss';
import Label from '../lib/Label';
import FormError from '../lib/FormError';
import Input from '../lib/Input';
import Button from '../lib/Button';
import Flex from '../lib/Flex';

/*== Contact form =====================================================

This component renders a contact pop-up that allows all users,
auth'd or not, to send a message to the service team at spotter.

This form is present on all pages in the bottom right-hand corner. The
design is inspired by enterprise chat support systems such as Intercom:
https://www.intercom.com/

Props:
  form: boolean
    a boolean that states whether the form is open or closed. used to
    determine the transition animation, be it fade in or fade out

*/

interface Props {
  form: boolean;
}

const ContactForm: React.FC<Props> = ({ form }) => {
  // api utilities
  const [res, call, reset] = useApi();

  // a function that dynamically generates a classname depending on
  // the form prop. returns either a fade in animation or fade out
  const animateForm = (): string => {
    return `animated ${form ? 'fadeIn' : 'fadeOut'} faster ${styles.contact}`;
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', subject: '', message: '' }}
      validationSchema={ContactSchema}
      // on form submit, reset the fields and call the api
      onSubmit={async (values, { resetForm }): Promise<void> => {
        resetForm();
        await call(contactQuery, [values]);
      }}
    >
      {({ errors, touched }): JSX.Element => (
        <section data-testid='contact-form' className={animateForm()}>
          <div>
            <p className={styles.title}>
              Hi there!{' '}
              <span role='img' aria-label='hand-wave'>
                👋
              </span>
            </p>
            <p className={styles.description}>
              Ask us anything, or share your feedback.
            </p>
          </div>
          <Form>
            <HTTPResponse
              css={{ padding: '1rem' }}
              error={res.error}
              success={res.data?.message}
              reset={reset}
            />
            <section className={styles.container}>
              <Flex justify='space-between'>
                <Label content='Name' input='name' />
                <FormError touched={touched} errors={errors} node='name' />
              </Flex>
              <Field
                css={{ marginBottom: '2rem' }}
                as={Input}
                placeholder='Jane Doe'
                type='text'
                name='name'
              />
              <Flex justify='space-between'>
                <Label content='Email' input='email' />
                <FormError touched={touched} errors={errors} node='email' />
              </Flex>
              <Field
                css={{ marginBottom: '2rem' }}
                as={Input}
                placeholder='name@email.com'
                type='email'
                name='email'
              />
              <Flex justify='space-between'>
                <Label content='Subject' input='subject' />
                <FormError touched={touched} errors={errors} node='subject' />
              </Flex>
              <Field
                css={{ marginBottom: '2rem' }}
                placeholder='e.g. feature request'
                as={Input}
                type='text'
                name='subject'
              />
              <Flex justify='space-between'>
                <Label content='Message' input='message' />
                <FormError touched={touched} errors={errors} node='message' />
              </Flex>
              <Field
                css={{ marginBottom: '2rem' }}
                as={Input}
                placeholder='Your message goes here...'
                name='message'
                element='textarea'
              />
              <Button content='Submit' loading={res.isLoading} />
            </section>
          </Form>
        </section>
      )}
    </Formik>
  );
};

export default ContactForm;

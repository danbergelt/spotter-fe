import React, { SetStateAction, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import useToken from '../../hooks/useToken';
import Head from '../util/Head';
import * as Yup from 'yup';
import useApi from 'src/hooks/useApi';
import styles from './ChangeAccount.module.scss';
import Label from '../util/Label';
import FormError from '../util/FormError';
import Input from '../util/Input';
import Button from '../util/Button';
import HTTPResponse from '../util/HTTPResponse';
import Flex from '../util/Flex';

/*== Change Account Details =====================================================

Form component used to change account details (email, password)

User enters their current email/password, their new email/password, and confirm
that new email/password. Clicks submit, and their account is updated in the DB

Props:
  setState: React setStateAction
    the state setter that controls the popup state (open/closed)
  schema: Yup schema
    the form validator, either for emails or passwords
  api: Function
    the api call, either to change email or password
  labels: {string: string}
    labels for the inputs
  inputType: string
    either email or password

*/

interface Props {
  setState: React.Dispatch<SetStateAction<boolean>>;
  schema: Yup.ObjectSchema<Yup.Shape<object, Record<string, string>>>;
  api: Function;
  labels: { [key: string]: string };
  inputType: string;
}

const ChangeAccountForm: React.FC<Props> = ({
  setState,
  schema,
  api,
  labels,
  inputType
}) => {
  // auth token
  const token = useToken();

  // api utils
  const [res, call, reset] = useApi();

  // when HTTP response is exited, component is re-rendered, automatically closing the popup
  // the below is a side effect that shortcircuits that behavior
  useEffect(() => {
    setState(true);
  }, [res, setState]);

  return (
    <>
      <Head size={13} setState={setState} />
      <Formik
        initialValues={{
          old: '',
          new: '',
          confirm: ''
        }}
        validationSchema={schema}
        onSubmit={async (values, { resetForm }): Promise<void> => {
          resetForm();
          await call(api, [token, values]);
        }}
      >
        {({ errors, touched }): JSX.Element => (
          <Form className={styles.form}>
            <Flex sb>
              <Label content={labels.old} input='old' />
              <FormError touched={touched} errors={errors} node='old' />
            </Flex>
            <Field
              css={{ padding: '0.5rem', marginBottom: '1rem' }}
              as={Input}
              name='old'
              type={inputType}
            />
            <Flex sb>
              <Label content={labels.new} input='new' />
              <FormError touched={touched} errors={errors} node='new' />
            </Flex>
            <Field
              css={{ padding: '0.5rem', marginBottom: '1rem' }}
              as={Input}
              name='new'
              type={inputType}
            />
            <Flex sb>
              <Label content={labels.confirm} input='confirm' />
              <FormError touched={touched} errors={errors} node='confirm' />
            </Flex>
            <Field
              css={{ padding: '0.5rem', marginBottom: '1rem' }}
              as={Input}
              name='confirm'
              type={inputType}
            />
            <Button content='Save' loading={res.isLoading} />
            <HTTPResponse
              css={{ padding: '1rem', marginTop: '1rem', marginBottom: '1rem' }}
              reset={reset}
              error={res.error}
              success={res.data?.message}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangeAccountForm;

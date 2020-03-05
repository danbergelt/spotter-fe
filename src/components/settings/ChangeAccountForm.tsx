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
  const token = useToken();
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

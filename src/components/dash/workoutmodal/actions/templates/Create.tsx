import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Input from 'src/components/lib/Input';
import Button from 'src/components/lib/Button';
import useApi from 'src/hooks/useApi';
import { saveTemplateQuery } from 'src/utils/queries';
import { useSelector } from 'react-redux';
import { State } from 'src/types/State';
import useToken from 'src/hooks/useToken';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import { Template } from 'src/types/Template';
import produce from 'immer';
import styles from './Create.module.scss';
import { CreateTemplateSchema } from '../../../../../utils/validators';
import FormError from 'src/components/lib/FormError';

interface Props {
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
}

const Create: React.FC<Props> = ({ setTemplates }) => {
  const [res, call, reset] = useApi();

  const token = useToken();

  const workout = useSelector((state: State) => state.workoutReducer);

  useEffect(() => {
    if (res.data) {
      setTemplates(s =>
        produce(s, draft => {
          draft.push(res.data.template);
        })
      );
    }
  }, [res, setTemplates]);

  return (
    <Formik
      validationSchema={CreateTemplateSchema}
      initialValues={{ template: '' }}
      onSubmit={async (values, { resetForm }): Promise<void> => {
        resetForm();
        await call(saveTemplateQuery, [token, values.template, workout]);
      }}
    >
      {({ touched, errors }): JSX.Element => (
        <Form>
          <FormError
            css={styles.err}
            touched={touched}
            errors={errors}
            node='template'
          />
          <Field
            css={styles.input}
            as={Input}
            name='template'
            placeholder='e.g. leg day'
            type='text'
          />
          <Button
            css={styles.button}
            loading={res.isLoading}
            content='Create'
          />
          <HTTPResponse
            css={styles.res}
            success={res.data && 'Template created'}
            error={res.error}
            reset={reset}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Create;

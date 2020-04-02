import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Input from 'src/components/lib/Input';
import Button from 'src/components/lib/Button';
import useApi from 'src/hooks/useApi';
import { saveTemplateQuery } from 'src/utils/queries';
import { useSelector } from 'react-redux';
import { State } from 'src/types';
import useToken from 'src/hooks/useToken';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import { Template } from 'src/types';
import produce from 'immer';
import styles from './Create.module.scss';
import { CreateTemplateSchema } from '../../../../../utils/validators';
import FormError from 'src/components/lib/FormError';

/*== Create template =====================================================

Create a new workout template. Can be used to easily load workouts to use
in the context of a larger routine, e.g. leg day, arm day, etc. Give your
template a name, press 'create', and save a template by loading the current
workout from state and sending to the server to be persisted.

Props:
  setTemplates: React setStateAction
  on a successful create query, push the new template into the template state
  kept in the parent

*/

interface Props {
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
}

const Create: React.FC<Props> = ({ setTemplates }) => {
  // api utils
  const [res, call, reset] = useApi();

  // auth token
  const token = useToken();

  // current workout details
  const workout = useSelector((state: State) => state.workoutReducer);

  // on successful request, push the template into the template state
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

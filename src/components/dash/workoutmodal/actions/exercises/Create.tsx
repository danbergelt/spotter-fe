import React, { useEffect } from 'react';
import useToken from '../../../../../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { createExerciseQuery } from 'src/utils/queries';
import { Formik, Form, Field } from 'formik';
import Input from 'src/components/lib/Input';
import Button from 'src/components/lib/Button';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import styles from './Create.module.scss';
import { CreateExerciseSchema } from 'src/utils/validators';
import FormError from 'src/components/lib/FormError';
import { SavedExercise } from 'src/types';
import produce from 'immer';

/*== Create exercise =====================================================

A form to create an exercise, save to server, and push onto local state.
Created exercises are used to track PRs (and potentially more stats).

TODO --> separating this form from the PRs/stats page is unintuitive,
and has been a source of confusion. Look into moving this functionality to
the PR's page, so that users can add exercises to track and view tracked
exercises in one place instead of having to go back and forth. Also,
this functionality is not clear ('why does this exist') unless a user knows
about how the PR's are tracked.

*/

interface Props {
  setExercises: React.Dispatch<React.SetStateAction<SavedExercise[]>>;
}

const Create: React.FC<Props> = ({ setExercises }) => {
  // api utils
  const [res, call, reset] = useApi();

  // auth token
  const token = useToken();

  // if api call successful, push the saved exercise to app state
  useEffect(() => {
    if (res.data) {
      setExercises(s =>
        produce(s, draft => {
          draft.push(res.data.exercise);
        })
      );
    }
  }, [res, setExercises]);

  return (
    <Formik
      validationSchema={CreateExerciseSchema}
      initialValues={{ exercise: '' }}
      onSubmit={async (values, { resetForm }): Promise<void> => {
        resetForm();
        await call(createExerciseQuery, [token, values.exercise.toLowerCase()]);
      }}
    >
      {({ touched, errors }): JSX.Element => (
        <Form>
          <FormError
            css={styles.err}
            touched={touched}
            errors={errors}
            node='exercise'
          />
          <Field
            css={styles.input}
            name='exercise'
            placeholder='e.g. squat'
            type='text'
            as={Input}
          />
          <Button
            css={styles.button}
            content='Create'
            loading={res.isLoading}
          />
          <HTTPResponse
            css={styles.res}
            reset={reset}
            error={res.error}
            success={res.data && 'Exercise created'}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Create;

import React from 'react';
import { Form, Field, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ExerciseForm.module.scss';
import {
  addExerciseAction,
  editExerciseAction
} from '../../../actions/workoutActions';
import { State } from 'src/types/State';
import { Queued } from '../../../types/Exercises';
import { ExerciseSchema } from 'src/utils/validators';
import Flex from 'src/components/lib/Flex';
import { useWindowSize } from 'react-use';
import Label from 'src/components/lib/Label';
import Input from 'src/components/lib/Input';
import FormError from 'src/components/lib/FormError';
import Button from 'src/components/lib/Button';

// READ: Formik claims to make working with forms easer,
// but it does not play nicely with other libraries. I need to figure out how to optimize this,
// or consider other options going forward (react-hook-form looks nice)

const ExerciseForm: React.FC = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  // queued represents the exercise currently being edited
  const queued: Queued = useSelector(
    (state: State) => state.workoutReducer.queue
  );

  const initialValue = (key: string): string => {
    if (Object.keys(queued).length) {
      return queued.exercise?.[key];
    }
    return '';
  };

  return (
    <Formik
      initialValues={{
        name: initialValue('name'),
        weight: initialValue('weight'),
        sets: initialValue('sets'),
        reps: initialValue('reps')
      }}
      validationSchema={ExerciseSchema}
      enableReinitialize={true}
      onSubmit={(values, { resetForm }): void => {
        resetForm();

        // if editing an exercise, submit an edit dispatch. otherwise submit an add dispatch
        if (Object.keys(queued).length) {
          dispatch(editExerciseAction(values, queued.i as number));
        } else {
          dispatch(addExerciseAction(values));
        }
      }}
    >
      {({ errors, touched }): JSX.Element => (
        <Form className={styles.form}>
          <Flex fd={width <= 500 ? 'column' : undefined} css={styles.fields}>
            <Flex fd='column' css={styles.field}>
              <Label input='name' content='Exercise' />
              <Field
                css={styles.input}
                as={Input}
                name='name'
                placeholder='e.g. squat'
                type='text'
              />
              <FormError errors={errors} touched={touched} node='name' />
            </Flex>
            <Flex fd='column' css={styles.field}>
              <Label input='weight' content='Weight' />
              <Field
                css={styles.input}
                as={Input}
                name='weight'
                placeholder='lbs'
                type='number'
              />
              <FormError errors={errors} touched={touched} node='weight' />
            </Flex>
            <Flex fd='column' css={styles.field}>
              <Label input='sets' content='Sets' />
              <Field
                css={styles.input}
                as={Input}
                name='sets'
                placeholder='# of sets'
                type='number'
              />
              <FormError errors={errors} touched={touched} node='sets' />
            </Flex>
            <Flex fd='column' css={styles.field}>
              <Label input='reps' content='Reps' />
              <Field
                css={styles.input}
                as={Input}
                name='reps'
                placeholder='# of reps'
                type='number'
              />
              <FormError errors={errors} touched={touched} node='reps' />
            </Flex>
          </Flex>
          <Button css={styles.btn} content='Add' />
        </Form>
      )}
    </Formik>
  );
};

export default ExerciseForm;

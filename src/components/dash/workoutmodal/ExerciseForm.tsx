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

/*== Exercise form =====================================================

The form that allows a user to add an exercise to the current workout.
Includes exercise name, weight, sets, reps.

*/

const ExerciseForm: React.FC = () => {
  // state dispatcher
  const dispatch = useDispatch();

  // viewport width for dynamic mobile styling
  const { width } = useWindowSize();

  // queued represents the exercise currently being edited
  const queued: Queued = useSelector(
    (state: State) => state.workoutReducer.queue
  );

  // helper function that sets initial value for form inputs
  const initialValue = (key: string): string => {
    // if an exercise is queued for editing
    if (Object.keys(queued).length) {
      // set initial value of form to the respective value in the exercise
      return queued.exercise?.[key];
    }
    // otherwise set initial value as an empty string
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
      // allow form to repopulate with queued values
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
        <Form data-testid='exercise-form' className={styles.form}>
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

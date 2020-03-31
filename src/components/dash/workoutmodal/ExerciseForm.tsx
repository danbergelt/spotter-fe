import React from 'react';
import { Form, Field, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import styles from './ExerciseForm.module.scss';
import {
  addExerciseAction,
  editExerciseAction
} from '../../../actions/workoutActions';
import { ExerciseSchema } from 'src/utils/validators';
import Flex from 'src/components/lib/Flex';
import { useWindowSize } from 'react-use';
import Label from 'src/components/lib/Label';
import Input from 'src/components/lib/Input';
import FormError from 'src/components/lib/FormError';
import Button from 'src/components/lib/Button';
import { Editing } from 'src/types/Types';

/*== Exercise form =====================================================

The form that allows a user to add an exercise to the current workout.
Includes exercise name, weight, sets, reps.

*/

interface Props {
  editing: Editing;
  setEditing: React.Dispatch<React.SetStateAction<Editing>>;
}

const ExerciseForm: React.FC<Props> = ({ editing, setEditing }) => {
  // state dispatcher
  const dispatch = useDispatch();

  // viewport width for dynamic mobile styling
  const { width } = useWindowSize();

  // helper function that sets initial value for form inputs
  const initialValue = (key: string): string => {
    // if an exercise is queued for editing
    if (Object.keys(editing).length) {
      // set initial value of form to the respective value in the exercise
      return editing.exercise?.[key];
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
      // allow form to repopulate with exercise to edit
      enableReinitialize={true}
      onSubmit={(values, { resetForm }): void => {
        // all exercise names must be lowercase to preserve consistency of PR tracking
        // TODO --> improve PR aggregation on server so this is not necessary
        values.name = values.name.toLowerCase();

        // if editing an exercise, submit an edit dispatch. otherwise submit an add dispatch
        if (Object.keys(editing).length) {
          dispatch(editExerciseAction(values, editing.i));
        } else {
          dispatch(addExerciseAction(values));
        }

        // reset the editing state and reset the form
        setEditing({} as Editing);
        resetForm();
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
                type='text'
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
                type='text'
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
                type='text'
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

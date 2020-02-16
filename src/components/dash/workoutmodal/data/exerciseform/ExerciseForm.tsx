import React, { useState } from 'react';
import { Form, Field, Formik } from 'formik';
import { FiPlusCircle, FiTrash } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { ValidationSchema } from './ValidationSchema';
import {
  resetExerciseFormAction,
  addExerciseAction,
  editExerciseAction
} from '../../../../../actions/workoutActions';
import Autosuggest from 'react-autosuggest';
import { State } from 'src/types/State';
import { Queued, Refs } from '../../../../../types/Exercises';
import { Exercise as E } from '../../../../../types/ExerciseOption';

// READ: Formik claims to make working with forms easer,
// but it does not play nicely with other libraries. I need to figure out how to optimize this,
// or consider other options going forward (react-hook-form looks nice)

interface Props {
  refs: Refs;
}

const ExerciseForm: React.FC<Props> = ({ refs }) => {
  const dispatch = useDispatch();

  // queued represents the exercise currently being edited
  const queued: Queued = useSelector(
    (state: State) => state.workoutReducer.queue
  ) as Queued;

  // selecting exercises from state to populate auto-complete
  // that way, if a user has an exercise saved and wants to track PRs, they can click via auto-complete and avoid spelling mistakes
  const exercises: Array<E> = useSelector(
    (state: State) => state.fetchExercisesReducer.savedExercises
  );

  // resets form inputs and queue state
  const resetHandler = (handleReset: () => void): void => {
    dispatch(resetExerciseFormAction(handleReset));
  };

  const [suggestions, setSuggestions] = useState<Array<E>>([]);

  type TButtonStyles<T> = {
    [K: string]: T;
  };
  const buttonStyles: TButtonStyles<string> = {
    border: 'none',
    background: 'none',
    padding: '0',
    outline: 'none'
  };

  return (
    <section className='exercise-form-container'>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        // if an exercise is queued, populate with that exercise. otherwise, initialize to empty fields
        initialValues={{
          name: (!isEmpty(queued) && queued.exercise.name) || '',
          weight: (!isEmpty(queued) && queued.exercise.weight) || '',
          sets: (!isEmpty(queued) && queued.exercise.sets) || '',
          reps: (!isEmpty(queued) && queued.exercise.reps) || ''
        }}
        validationSchema={ValidationSchema}
        // allow the form to populate with initial values after first render
        // useful for repopulating the form with a queued exercise
        enableReinitialize={true}
        onSubmit={(values, { resetForm }): void => {
          resetForm();

          // aside from name, blur all fields on submit
          refs.forEach((ref: React.RefObject<HTMLInputElement>) => {
            if (ref.current) {
              ref.current.blur();
            }
          });

          // if editing an exercise, submit an edit dispatch. otherwise submit an add dispatch
          if (isEmpty(queued)) {
            dispatch(addExerciseAction(values));
          } else {
            dispatch(editExerciseAction(values, queued.i));
          }
        }}
      >
        {({
          handleReset,
          errors,
          touched,
          setFieldValue,
          values
        }): JSX.Element => (
          <Form className='exercise-form'>
            <div className='exercise-form-fields-container'>
              <div className='exercise-form-field-container'>
                <div className='exercise-form-field-label'>
                  <label>Exercise</label>
                </div>
                <Autosuggest
                  // CODE SMELL
                  // this component is not actively maintained, and contains multiple unsafe lifecycle methods
                  // also - it's just plain complicated
                  // consider either namespacing the module, opting for a different library, or building a custom component
                  // TO INVESTIGATE - ReachUI Combobox

                  // control the input hooked up to autosuggest
                  inputProps={{
                    placeholder: 'e.g. squat',
                    autoComplete: 'off',
                    name: 'name',
                    onChange: (_, { newValue }): void => {
                      setFieldValue('name', newValue);
                    },
                    value: values.name,
                    className: 'exercise-form-field'
                  }}
                  suggestions={suggestions}
                  // handles fetching autosuggestions in respect to field input
                  onSuggestionsFetchRequested={({ value }): void => {
                    if (!value) {
                      setSuggestions([]);
                      return;
                    }

                    setSuggestions(
                      exercises.filter((exercise: E) =>
                        exercise.name
                          .toLowerCase()
                          .includes(value.toLowerCase())
                      )
                    );
                  }}
                  // handles clearing suggestions (why is this prop necessary?)
                  onSuggestionsClearRequested={(): void => {
                    setSuggestions([]);
                  }}
                  // fetches suggestion from local state
                  getSuggestionValue={(suggestion): string => suggestion.name}
                  // renders the autosuggest component with suggestions
                  renderSuggestion={(suggestion): JSX.Element => (
                    <div>{suggestion.name}</div>
                  )}
                  // passes the clicked suggestion to the input
                  onSuggestionSelected={(
                    event,
                    { suggestion, method }
                  ): void => {
                    if (method === 'enter') {
                      event.preventDefault();
                    }
                    setFieldValue('name', suggestion.name);
                  }}
                />
                {errors.name && touched.name && (
                  <p className='error-exercise-form'>{errors.name}</p>
                )}
              </div>
              <div className='exercise-form-field-container'>
                <label className='exercise-form-field-label'>Weight</label>
                <Field
                  innerRef={refs[0]}
                  className='exercise-form-field'
                  name='weight'
                  placeholder='lbs'
                  type='number'
                />
                {errors.weight && touched.weight && (
                  <p className='error-exercise-form'>{errors.weight}</p>
                )}
              </div>
              <div className='exercise-form-field-container'>
                <label className='exercise-form-field-label'>Sets</label>
                <Field
                  innerRef={refs[1]}
                  className='exercise-form-field'
                  name='sets'
                  placeholder='# of sets'
                  type='number'
                />
                {errors.sets && touched.sets && (
                  <p className='error-exercise-form'>{errors.sets}</p>
                )}
              </div>
              <div className='exercise-form-field-container'>
                <label className='exercise-form-field-label'>Reps</label>
                <Field
                  innerRef={refs[2]}
                  className='exercise-form-field'
                  name='reps'
                  placeholder='# of reps'
                  type='number'
                />
                {errors.reps && touched.reps && (
                  <p className='error-exercise-form'>{errors.reps}</p>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                data-testid='submit-exercise'
                style={buttonStyles}
                type='submit'
              >
                <FiPlusCircle className='submit-exercise' />
              </button>
              <button
                style={{
                  ...buttonStyles,
                  position: 'relative',
                  top: '3px'
                }}
                type='button'
              >
                <FiTrash
                  data-testid='trash-exercise'
                  className='exercise-form-button clear'
                  type='button'
                  onClick={(): void => resetHandler(handleReset)}
                />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ExerciseForm;

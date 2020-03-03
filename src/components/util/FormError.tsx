import React from 'react';
import { FormikTouched, FormikErrors } from 'formik';
import styles from './FormError.module.scss';

/*== Form Error =====================================================

  Accepts Formik touched && errors objects, and returns an error message
  Uses Yup https://github.com/jquense/yup for validation

  Props:
    touched: FormikTouched
      An object that returns which objects have been focused by user
    errors: FormikErrors
      An object that contains validation errors (FE only, no server comms)
    node: string
      The input name that lives inside of Formik's state

*/

// accepts Formik touched && errors, returns an error message

interface Props {
  touched: FormikTouched<Record<string, string | number>>;
  errors: FormikErrors<Record<string, string | number>>;
  node: string;
}

const FormError: React.FC<Props> = ({ touched, errors, node }) => {
  // if input has been touched and there is an error, return the error
  const error = (): JSX.Element | undefined => {
    if (touched[node] && errors[node]) {
      return <p className={styles.error}>{errors[node]}</p>;
    }
    return;
  };

  return <>{error()}</>;
};

export default FormError;

import React from 'react';
import { FormikTouched, FormikErrors } from 'formik';

// accepts Formik touched && errors, returns an error message

interface Props {
  touched: FormikTouched<Record<string, string | number>>;
  errors: FormikErrors<Record<string, string | number>>;
  node: string;
}

const FormError: React.FC<Props> = ({ touched, errors, node }) => {
  // if input has been touched and there is an error, return the error
  const error = (): JSX.Element | null => {
    if (touched[node] && errors[node]) {
      return <p>{errors[node]}</p>;
    }
    return null;
  };

  return <>{error()}</>;
};

export default FormError;

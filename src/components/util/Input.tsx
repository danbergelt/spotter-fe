import React, { ChangeEvent } from 'react';
import styles from './Input.module.scss';

/*== Input =====================================================

Custom input component tailored for use with Formik

Props:
  name: string
    input name
  placeholder: string
    input placeholder
  type: string
    input type, e.g. password, number, etc.
  value: string
    the value as stored in Formik's managed state
  onChange: function
    the function that handles changes in Formik inputs

*/

interface Props {
  name: string;
  placeholder: string;
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
  name,
  placeholder,
  type,
  onChange,
  value
}) => {
  return (
    <input
      data-testid='input'
      className={styles.input}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;

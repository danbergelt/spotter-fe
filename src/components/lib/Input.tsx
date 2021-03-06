import React, { ChangeEvent } from 'react';
import styles from './Input.module.scss';
import cx from 'classnames';

/*== Input =====================================================

Custom input component tailored for use with Formik.

Also re

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
  element: enum['textarea' | 'input']
    optional prop that renders a texarea instead of a default input
  css: string
    custom classname
*/

interface Props {
  name: string;
  placeholder: string;
  innerRef?: React.RefObject<HTMLInputElement>;
  type: string;
  value: string | number;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  css?: string;
  element?: 'input' | 'textarea';
}

const Input: React.FC<Props> = ({
  name,
  innerRef,
  placeholder,
  type,
  onChange,
  value,
  css,
  element = 'input'
}) => {
  // default renders as a normal input (or if user explicitly passes the style prop)
  if (element === 'input') {
    return (
      <input
        ref={innerRef}
        data-testid='input'
        className={cx(styles.input, css)}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    );
  }

  // if the style prop is passed as a textarea, render a textarea
  if (element === 'textarea') {
    return (
      <textarea
        data-testid='input'
        className={cx(styles.textarea, css)}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
  return <></>;
};

export default Input;

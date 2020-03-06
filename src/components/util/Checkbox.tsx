import React from 'react';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
import styles from './Checkbox.module.scss';

interface Props {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkbox: React.FC<Props> = ({ state, setState }) => {
  return state ? (
    <span
      className={styles.box}
      data-testid='checked'
      onClick={(): void => setState(false)}
    >
      <FiCheckSquare size={15} strokeWidth='3px' />
    </span>
  ) : (
    <span
      className={styles.box}
      data-testid='unchecked'
      onClick={(): void => setState(true)}
    >
      <FiSquare size={15} strokeWidth='3px' />
    </span>
  );
};

export default Checkbox;

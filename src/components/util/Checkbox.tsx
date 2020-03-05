import React from 'react';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
import styles from './Checkbox.module.scss';

interface Props {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkbox: React.FC<Props> = ({ state, setState }) => {
  return state ? (
    <div onClick={(): void => setState(false)} data-testid='checked'>
      <FiCheckSquare size={15} strokeWidth='3px' className={styles.box} />
    </div>
  ) : (
    <div onClick={(): void => setState(true)} data-testid='unchecked'>
      <FiSquare size={15} strokeWidth='3px' className={styles.box} />
    </div>
  );
};

export default Checkbox;

import React from 'react';
import { FiX } from 'react-icons/fi';
import styles from './Head.module.scss';

interface Props {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Head: React.FC<Props> = ({ setState }) => {
  return (
    <section className={styles.head}>
      <button
        data-testid='close'
        onClick={(): void => setState(false)}
        className={styles.close}
      >
        <FiX />
      </button>
    </section>
  );
};

export default Head;

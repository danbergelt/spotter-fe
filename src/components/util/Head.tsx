import React from 'react';
import { FiX } from 'react-icons/fi';
import styles from './Head.module.scss';

interface Props {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  size?: number;
}

const Head: React.FC<Props> = ({ setState, size }) => {
  return (
    <section className={styles.head}>
      <button
        data-testid='close'
        onClick={(): void => setState(false)}
        className={styles.close}
      >
        <FiX size={size && size} />
      </button>
    </section>
  );
};

export default Head;

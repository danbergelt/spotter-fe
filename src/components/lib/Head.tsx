import React from 'react';
import { FiX } from 'react-icons/fi';
import styles from './Head.module.scss';

/*== Reusable popup head =====================================================

A header that includes an X button that closes out of the currently opened modal
Can be reused across any modal/popup window
Also accepts a size that determines the size of the X. Otherwise, inherits
size from parent

Props:
  setState: React setState action
    state setter for parent modal/popup. called on modal close
  size: number
    the size of the X. if not passed, inherits from parent

*/

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
        <FiX data-testid='x' size={size && size} />
      </button>
    </section>
  );
};

export default Head;

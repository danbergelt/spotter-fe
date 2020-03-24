import React from 'react';
import styles from './Spinner.module.scss';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

/*== Spinner =====================================================

A spinner to load during any loading states.
Spinner from React Feather https://github.com/feathericons/react-feather

WIP: replace all React loader spinners with this.

Props:
  size: number
    the size of the spinner in px;
  color: string
    an optional prop that determines color. otherwise, defaults to white

*/

interface Props {
  size: number;
  color?: string;
  css?: React.CSSProperties;
}

const Spinner: React.FC<Props> = ({ size, color, css }) => {
  return (
    <AiOutlineLoading3Quarters
      data-testid='spinner'
      className={styles.spinner}
      size={size ? size : 13}
      color={color ? color : 'white'}
      style={{ ...css }}
    />
  );
};

export default Spinner;

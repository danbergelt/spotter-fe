import React from 'react';
import styles from './Spinner.module.scss';
import { FiRotateCw } from 'react-icons/fi';

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
    <FiRotateCw
      data-testid='spinner'
      strokeWidth='3px'
      className={styles.spinner}
      size={size}
      color={color ? color : 'white'}
      style={{ ...css }}
    />
  );
};

export default Spinner;

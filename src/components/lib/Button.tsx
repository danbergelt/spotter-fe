import React from 'react';
import styles from './Button.module.scss';
import Spinner from './Spinner';
import cx from 'classnames';

/*== Button =====================================================

Reusable button for form components. Defaults to type submit,
and displays a loader via passed-in loading prop. Loader will run
if the current request is pending

Props:
  content: string
    the button content
  loading: boolean
    the loading state of the current request
  css: string
    custom classname
  func: Function
    when used outside of a form, an optional function prop
    to pass in as onClick handler

*/

interface Props {
  content: string;
  loading?: boolean;
  css?: string;
  func?: Function;
}

const Button: React.FC<Props> = ({ content, loading, css, func }) => {
  return (
    <button
      onClick={(): void => func && func()}
      data-testid='button'
      type='submit'
      className={cx(styles.button, css)}
    >
      {loading ? (
        <div data-testid='loader'>
          <Spinner size={13} />
        </div>
      ) : (
        content
      )}
    </button>
  );
};

export default Button;

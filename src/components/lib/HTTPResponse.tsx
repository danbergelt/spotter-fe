import React from 'react';
import styles from './HTTPResponse.module.scss';
import { FiX } from 'react-icons/fi';
import cx from 'classnames';

/*== HTTP Response =====================================================

Displays a message when Promise resolves/rejects

Props
  error: string
    rejected error message
  success: string
    resolved success message
  reset: function
    reset the triggering state, unmount the HTTP response
  css: string
    custom classname

*/

interface Props {
  error?: string | null;
  success?: string | null;
  reset?: Function;
  css?: string;
}

const HTTPResponse: React.FC<Props> = ({ error, success, reset, css }) => {
  // close the error message
  const handleClose = (): void | false => reset && reset();
  // error case --> return a message with error styles
  if (error) {
    return (
      <div data-testid='res' className={cx(styles.error, css)}>
        <p>{error}</p>
        <FiX
          data-testid='close'
          onClick={handleClose}
          className={styles.close}
        />
      </div>
    );
  }
  // success case --> return a message with success styles
  if (success) {
    return (
      <div data-testid='res' className={cx(styles.success, css)}>
        <p>{success}</p>
        <FiX
          data-testid='close'
          onClick={handleClose}
          className={styles.close}
        />
      </div>
    );
  }
  // if there is no http response, render a fragment
  return <></>;
};

export default HTTPResponse;

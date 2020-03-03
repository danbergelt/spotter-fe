import React from 'react';
import styles from './HTTPResponse.module.scss';
import { FiX } from 'react-icons/fi';

/*== HTTP Response =====================================================

Displays a message when Promise resolves/rejects

Props
  error: string
    rejected error message
  success: string
    resolved success message

*/

interface Props {
  error?: string | null;
  success?: string | null;
  reset?: Function;
}

const HTTPResponse: React.FC<Props> = ({ error, success, reset }) => {
  // close the error message
  const handleClose = (): void | false => reset && reset();
  // error case --> return a message with error styles
  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <FiX onClick={handleClose} className={styles.close} />
      </div>
    );
  }
  // success case --> return a message with success styles
  if (success) {
    return (
      <div className={styles.success}>
        <p>{success}</p>
        <FiX onClick={handleClose} className={styles.close} />
      </div>
    );
  }
  // if there is no http response, render a fragment
  return <></>;
};

export default HTTPResponse;

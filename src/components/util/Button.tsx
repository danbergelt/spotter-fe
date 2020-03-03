import React from 'react';
import styles from './Button.module.scss';
import Loader from 'react-loader-spinner';

/*== Button =====================================================

Reusable button for form components. Defaults to type submit,
and displays a loader via passed-in loading prop. Loader will run
if the current request is pending

Props:
  content: string
    the button content
  loading: boolean
    the loading state of the current request

*/

interface Props {
  content: string;
  loading?: boolean;
}

const Button: React.FC<Props> = ({ content, loading }) => {
  return (
    <button type='submit' className={styles.button}>
      {loading ? (
        <div data-testid='loader'>
          <Loader type='ThreeDots' color='white' height={10} width={30} />
        </div>
      ) : (
        content
      )}
    </button>
  );
};

export default Button;

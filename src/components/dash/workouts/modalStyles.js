import styles from '../../../styles/variables.scss';
import { useWindowSize } from 'react-use';

/* eslint-disable */

export const useModalStyles = () => {
  const { width } = useWindowSize();

  const sizes = {
    large: '750px',
    largeMedium: '585px',
    medium: '450px',
    small: '300px'
  };

  const setModalSize = () => {
    if (width <= 500) {
      return sizes.small;
    } else if (width <= 650) {
      return sizes.medium;
    } else if (width <= 800) {
      return sizes.largeMedium;
    } else {
      return sizes.large;
    }
  };

  return {
    content: {
      width: setModalSize(),
      margin: '0 auto',
      background: styles.gray3,
      border: 0,
      padding: width <= 500 ? '10px' : '20px'
    }
  };
};

import { useWindowSize } from 'react-use';

/* eslint-disable */

export const useTagModalStyles = () => {
  const { width } = useWindowSize();

  return {
    overlay: {
      background: 'transparent'
    },
    content: {
      width: (width <= 500 && '275px') || (width <= 800 && '290px') || '300px',
      height: '350px',
      marginLeft:
        (width <= 500 && '14vw') || (width <= 800 && '40vw') || '55vw',
      marginTop: width <= 800 ? '45vh' : 0
    }
  };
};

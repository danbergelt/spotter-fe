import { useWindowSize } from 'react-use';

/* eslint-disable */

export const useSaveTemplateStyles = () => {
  const { width }: { width: number } = useWindowSize();
  return {
    overlay: {
      background: 'transparent'
    },
    content: {
      width: width <= 500 ? '275px' : '250px',
      height: '200px',
      marginLeft:
        (width <= 500 && '14vw') || (width <= 800 && '25vw') || '60vw',
      marginTop: (width <= 500 && '45vh') || (width <= 800 && '55vh') || '18vh'
    }
  };
};

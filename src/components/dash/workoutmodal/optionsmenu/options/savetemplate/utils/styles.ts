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
      height: 'auto',
      marginLeft:
        (width <= 500 && '14vw') || (width <= 800 && '40vw') || '60vw',
      marginTop: width <= 800 ? '58vh' : '18vh'
    }
  };
};

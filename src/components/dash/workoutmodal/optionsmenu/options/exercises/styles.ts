import { useWindowSize } from 'react-use';

// eslint-disable-next-line
export const useExerciseModalStyles = () => {
  const { width }: { width: number } = useWindowSize();

  return {
    overlay: {
      background: 'transparent'
    },
    content: {
      width: '275px',
      height: 'auto',
      marginLeft:
        (width <= 500 && '14vw') || (width <= 800 && '40vw') || '60vw',
      marginTop: width <= 800 ? '60vh' : '29.5vh'
    }
  };
};

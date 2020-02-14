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
      height: '200px',
      marginLeft:
        (width <= 500 && '14vw') || (width <= 800 && '25vw') || '60vw',
      marginTop:
        (width <= 500 && '45vh') || (width <= 800 && '50vh') || '29.5vh'
    }
  };
};

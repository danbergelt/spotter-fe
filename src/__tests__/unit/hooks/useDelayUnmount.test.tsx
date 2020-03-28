import { renderHook, act } from '@testing-library/react-hooks';
import useDelayUnmount from 'src/hooks/useDelayUnmount';

jest.useFakeTimers();

describe('delay component unmount hook', () => {
  test('returns true when component is mounting', () => {
    const { result } = renderHook(() => useDelayUnmount(true, 100));

    expect(result.current).toBe(true);
  });

  test('returns false after specificed delay when component is unmounting', () => {
    const { result, rerender } = renderHook(
      ({ state, delay }) => useDelayUnmount(state, delay),
      {
        initialProps: { state: true, delay: 1000 }
      }
    );

    rerender({ state: false, delay: 1000 });

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current).toBe(false);
    // 1: the first cleanup function on setting state to true
    // 2: the actual timeout call
    // 3: the second cleanup function on setting state to false
    expect(setTimeout).toHaveBeenCalledTimes(3);

    // the actual timeout call
    expect(setTimeout).toHaveBeenNthCalledWith(2, expect.any(Function), 1000);

    // the cleanup function in the useEffect
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
  });
});

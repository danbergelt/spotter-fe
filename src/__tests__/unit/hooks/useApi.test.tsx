import { renderHook, act } from '@testing-library/react-hooks';
import useApi from 'src/hooks/useApi';

const resolve = async (foo: string) => {
  const res = await Promise.resolve(foo);
  // standardized to match Axios response
  // TODO --> find a way to handle cases more generically
  return { data: res };
};

const reject = async (foo: string) => {
  // need to reject error in exact way that Axios does
  // TODO --> find a way to handle errors more generically
  await Promise.reject({ response: { data: { error: foo } } });
};

const fallback = async (foo: string) => {
  await Promise.reject(foo);
};

describe('useApi', () => {
  test('returns proper utilities on hook call', () => {
    const { result } = renderHook(() => useApi());
    const [res, call, reset] = result.current;
    expect(res).toStrictEqual({ isLoading: false, data: null, error: null });
    // below tests that 'call' is an async function
    // see here for syntax explanation --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
    expect(call).toBeInstanceOf(
      Object.getPrototypeOf(async () => {}).constructor
    );
    expect(reset).toBeInstanceOf(Function);
  });

  test('sucessful call', async () => {
    const { result } = renderHook(() => useApi());
    const [, call] = result.current;

    await act(async () => {
      await call(resolve, ['foo']);
    });

    const [res] = result.current;

    expect(res.data).toBe('foo');
  });

  test('failed call', async () => {
    const { result } = renderHook(() => useApi());
    const [, call] = result.current;

    await act(async () => {
      await call(reject, ['foo']);
    });

    const [res] = result.current;

    expect(res.error).toBe('foo');
  });

  test('failed call with passed-in errorMsg', async () => {
    const { result } = renderHook(() => useApi());
    const [, call] = result.current;

    await act(async () => {
      await call(reject, ['foo'], 'Custom err');
    });

    const [res] = result.current;

    expect(res.error).toBe('Custom err');
  });

  test('uncaught error', async () => {
    const { result } = renderHook(() => useApi());
    const [, call] = result.current;

    await act(async () => {
      await call(fallback, ['foo']);
    });

    const [res] = result.current;

    expect(res.error).toBe('Server error, try again later');
  });

  test('custom errormsg for uncaught error', async () => {
    const { result } = renderHook(() => useApi());

    const [, call] = result.current;

    await act(async () => {
      await call(fallback, ['foo'], 'Custom err');
    });

    const [res] = result.current;

    expect(res.error).toBe('Custom err');
  });

  test('reset helper resets the api state', async () => {
    const { result } = renderHook(() => useApi());

    const [, call] = result.current;

    await act(async () => {
      await call(resolve, ['foo']);
    });

    const [res, , reset] = result.current;

    expect(res.data).toBe('foo');

    act(() => {
      reset();
    });

    const [resetRes] = result.current;

    expect(resetRes).toStrictEqual({
      data: null,
      error: null,
      isLoading: false
    });
  });
});

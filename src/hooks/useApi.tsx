import { useState, useCallback } from 'react';
import produce from 'immer';

////////////////////////////////////////////////////////////////////////////
//
// utility hook to automate, abstract, and shorten api calls
// useful for when state is not being managed by a third party (e.g. formik)
// handles errors and loading. returns all metadata + a callback to call as
// a side effect, along with a reset function to clear the state
//
////////////////////////////////////////////////////////////////////////////

// the state that manages the api call data
interface Res {
  // eslint-disable-next-line
  data: any;
  error: null | string;
  isLoading: boolean;
}

// the params passed into the call function
type Call = (
  query: Function,
  // eslint-disable-next-line
  vars?: any[],
  errorMsg?: string | null
) => Promise<void>;

export default (): [Res, Call, () => void] => {
  const [res, setRes] = useState<Res>({
    data: null,
    error: null,
    isLoading: false
  });

  // reset state to null data
  // useful for clearing error messages, wiping state to prep for new api call
  const reset = useCallback(() => {
    setRes(state =>
      produce(state, draft => {
        draft.data = null;
        draft.error = null;
        draft.isLoading = false;
        return draft;
      })
    );
  }, []);

  const call: Call = useCallback(
    async (query, vars = [], errorMsg = null) => {
      // clear state
      reset();
      try {
        // start loading
        setRes(state =>
          produce(state, draft => {
            draft.isLoading = true;
            return draft;
          })
        );
        // make call
        const apiResponse = await query(...vars);
        // stop loading, set api response to state
        setRes(state =>
          produce(state, draft => {
            draft.data = apiResponse ? apiResponse.data : null;
            draft.isLoading = false;
            return draft;
          })
        );
      } catch (e) {
        // if the error is handled, set the error to state
        if (e.response) {
          setRes(state =>
            produce(state, draft => {
              draft.isLoading = false;
              draft.error = errorMsg ? errorMsg : e.response.data.error;
              return draft;
            })
          );
        } else {
          // if the error is unhandled, set the fallback to state
          setRes(state =>
            produce(state, draft => {
              draft.isLoading = false;
              draft.error = errorMsg
                ? errorMsg
                : 'Server error, try again later';
              return draft;
            })
          );
        }
      }
    },
    [reset]
  );

  return [res, call, reset];
};

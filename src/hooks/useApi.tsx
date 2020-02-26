import { useState, useCallback } from 'react';
import produce from 'immer';

////////////////////////////////////////////////////////////////////////////
//
// utility hook to automate, abstract, and shorten api calls
// useful for when state is not being managed by a third party (e.g. formik)
// handles errors and loading. returns all metadata + a callback to call as
// a side effect
//
////////////////////////////////////////////////////////////////////////////

interface Res {
  // eslint-disable-next-line
  data: any;
  error: null | string;
  isLoading: boolean;
}

export default (
  query: Function,
  vars = [],
  errorMsg = null
): [Res, () => Promise<void>] => {
  const [res, setRes] = useState<Res>({
    data: null,
    error: null,
    isLoading: false
  });

  const call = useCallback(async () => {
    try {
      setRes(state =>
        produce(state, draft => {
          draft.isLoading = true;
          return draft;
        })
      );
      const apiResponse = await query(...vars);
      setRes(state =>
        produce(state, draft => {
          draft.data = apiResponse ? apiResponse.data : null;
          draft.isLoading = false;
          return draft;
        })
      );
    } catch (e) {
      if (e.response) {
        setRes(state =>
          produce(state, draft => {
            draft.error = errorMsg ? errorMsg : e.response;
            return draft;
          })
        );
      } else {
        setRes(state =>
          produce(state, draft => {
            draft.error = errorMsg ? errorMsg : 'server error, try again later';
          })
        );
      }
    }
  }, [query, vars, errorMsg]);

  return [res, call];
};

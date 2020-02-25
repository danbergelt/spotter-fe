import { useState, useCallback } from 'react';
import produce from 'immer';

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
          draft.data = apiResponse.data;
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

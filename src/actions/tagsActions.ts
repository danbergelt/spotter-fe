import axiosWithAuth from '../utils/axiosWithAuth';
import { History } from 'history';
import { Action } from 'redux';
import { DELETE_TAG, UPDATE_TAG } from './workoutActions';
import { SET_ACTIVE, CLOSE_TAG_MODAL, OPEN_TAG_MODAL } from './optionsActions';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import { ThunkDispatch } from 'redux-thunk';
import { State } from 'src/types/State';
import endpoint from '../utils/endpoint';

export const FETCH_TAGS_START = 'FETCH_TAGS_START';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_ERROR = 'FETCH_TAGS_ERROR';

export const RESET_TAGS = 'RESET_TAGS';

// fetches tags and resets tags list on modal close
export const fetchTags = (history: History, t: string | null) => {
  return async (
    dispatch: ThunkDispatch<State, void, Action>
  ): Promise<void> => {
    dispatch({ type: FETCH_TAGS_START });
    try {
      const res = await axiosWithAuth(t).get(endpoint('tags'));
      dispatch({ type: FETCH_TAGS_SUCCESS, payload: res.data.tags });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: FETCH_TAGS_ERROR,
          payload: error.response.data.error
        });
      } else {
        history.push('/500');
      }
    }
  };
};

//save tag
interface ParamsHelper {
  token: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<
    React.SetStateAction<{
      success?: string | undefined;
      error?: string | undefined;
    }>
  >;
  history: History;
  setName: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  name: string;
}

type TSaveTag = (
  paramsHelper: ParamsHelper
) => (dispatch: ThunkDispatch<State, void, Action>) => Promise<void>;

export const saveTagAction: TSaveTag = paramsHelper => {
  const {
    setLoading,
    token,
    color,
    history,
    setMessage,
    setName,
    name
  } = paramsHelper;

  return async (dispatch): Promise<void> => {
    setLoading(true);
    try {
      await axiosWithAuth(token).post(endpoint('tags'), {
        color: color,
        content: name
      });
      // confirmation message
      setMessage({ success: 'New tag created' });
      // resets submitting state
      setLoading(false);
      setName('');
      await dispatch(fetchTags(history, token));
    } catch (error) {
      setMessage(error.response.data);
      setLoading(false);
      setName('');
    }
  };
};

// set active tags modal tab
// tabs include manage, create, delete (triggered in manage view by clicking delete button), add
type TSetActiveTab = (id: number) => { type: string; payload: number };
export const setActiveTabAction: TSetActiveTab = id => {
  return { type: SET_ACTIVE, payload: id };
};

//delete tag
interface DelTagHelper {
  t: string | null;
  toDelete: Partial<TagOnWorkout>;
  history: History;
  reFetch: Function;
  timeSpan: number;
  scope: { value: string; label: string };
  setErr: Function;
}

type TDeleteTag = (
  paramsHelper: DelTagHelper
) => (dispatch: ThunkDispatch<State, void, Action>) => Promise<void>;

export const deleteTagAction: TDeleteTag = paramsHelper => {
  const {
    t,
    toDelete,
    history,
    reFetch,
    timeSpan,
    scope,
    setErr
  } = paramsHelper;

  return async (dispatch): Promise<void> => {
    try {
      await axiosWithAuth(t).delete(endpoint(`tags/${toDelete._id}`));
      dispatch({
        type: DELETE_TAG,
        payload: toDelete
      });
      // push user to first tab
      dispatch(setActiveTabAction(0));

      // CODE SMELL
      await dispatch(fetchTags(history, t));
      await reFetch(timeSpan, history, scope.value, t);
      // need to investigate filtering tag from state locally (both on workouts in view, and in tags)
      // this is very hacky how I'm manually triggering a server call to 're-fetch' the data
      // will clean up this code, create a cleaner transition into a new state (since I'm not relying on asynchronous side effects to usher in fresh state), and reduce BE hits
      // CODE SMELL
    } catch (error) {
      setErr(error.response.data.error);
    }
  };
};

// submit an edited tag
interface EditTagHelper {
  t: string | null;
  update: Partial<TagOnWorkout>;
  updateInput: string;
  setUpdate: Function;
  history: History;
  setErr: Function;
}

type TEditTag = (
  paramsHelper: EditTagHelper
) => (dispatch: ThunkDispatch<State, void, Action>) => Promise<void>;

export const editTagAction: TEditTag = paramsHelper => {
  const { t, update, updateInput, setUpdate, history, setErr } = paramsHelper;
  return async (dispatch): Promise<void> => {
    try {
      const res = await axiosWithAuth(t).put(endpoint(`tags/${update._id}`), {
        content: updateInput
      });
      setUpdate({});
      dispatch({
        type: UPDATE_TAG,
        payload: res.data.tag
      });
      // CODE SMELL
      await dispatch(fetchTags(history, t));
      // need to investigate filtering tag from state locally (both on workouts in view, and in tags)
      // this is very hacky how I'm manually triggering a server call to 're-fetch' the data
      // will clean up this code, create a cleaner transition into a new state (since I'm not relying on asynchronous side effects to usher in fresh state), and reduce BE hits
      // CODE SMELL
    } catch (error) {
      setErr(error.response.data.error);
    }
  };
};

// close tag modal
export const closeTagModalAction = (): { type: string } => {
  return { type: CLOSE_TAG_MODAL };
};

// open tag modal
export const openTagModalAction = (): { type: string } => {
  return { type: OPEN_TAG_MODAL };
};

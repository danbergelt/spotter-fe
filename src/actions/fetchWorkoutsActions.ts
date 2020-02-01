import axiosWithAuth from '../utils/axiosWithAuth';
import { History } from 'history';
import { Dispatch, AnyAction, Action } from 'redux';
import { State } from '../types/State';
import { ThunkDispatch } from 'redux-thunk';

export const FETCH_WORKOUTS_START = 'FETCH_WORKOUTS_START';
export const FETCH_WORKOUTS_SUCCESS = 'FETCH_WORKOUTS_SUCCESS';
export const FETCH_WORKOUTS_ERROR = 'FETCH_WORKOUT_ERROR';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';

// fetches workouts based on range (e.g. week or month)
interface Params {
  (range: Array<string>, history: History, t: string | null): (
    dispatch: ThunkDispatch<State, void, AnyAction>
  ) => Promise<void>;
}
export const fetchWorkouts: Params = (range, history, t) => {
  return (dispatch): Promise<void> => {
    dispatch({ type: FETCH_WORKOUTS_START });
    return axiosWithAuth(t)
      .post(`${process.env.REACT_APP_T_API}/api/auth/workouts/range`, {
        range
      })
      .then(res => {
        dispatch({ type: FETCH_WORKOUTS_SUCCESS, payload: res.data.workouts });
      })
      .catch(err => {
        if (err.response) {
          dispatch({
            type: FETCH_WORKOUTS_ERROR,
            payload: err.response.data.error
          });
        } else {
          history.push('/500');
        }
      });
  };
};

// delete workout (both locally in the store and remote in the DB)
interface DeleteWorkoutAction {
  type: string;
  payload: string;
}

type TDeleteWorkout = (
  t: string | null,
  workoutId: string
) => (dispatch: Dispatch<Action>) => Promise<DeleteWorkoutAction>;

export const deleteWorkoutAction: TDeleteWorkout = (t, workoutId) => {
  return async (dispatch): Promise<DeleteWorkoutAction> => {
    await axiosWithAuth(t).delete(
      `${process.env.REACT_APP_T_API}/api/auth/workouts/${workoutId}`
    );
    return dispatch({ type: DELETE_WORKOUT, payload: workoutId });
  };
};

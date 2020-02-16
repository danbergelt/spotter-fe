import axiosWithAuth from '../utils/axiosWithAuth';
import { Action } from 'redux';
import { History } from 'history';
import { AxiosResponse } from 'axios';
import { Msg } from 'src/types/ExerciseOption';
import { State } from 'src/types/State';
import { ThunkDispatch } from 'redux-thunk';
import { api } from '../utils/api';

export const FETCH_EXERCISES_SUCCESS = 'FETCH_EXERCISES_SUCCESS';
export const FETCH_EXERCISES_ERROR = 'FETCH_EXERCISES_ERROR';
export const CREATE_EXERCISE = 'CREATE_EXERCISE';
export const DELETE_SAVED_EXERCISE = 'DELETE_SAVED_EXERCISE';

// fetches saved exercises
// only saved exercises can be used to track PRs
export const fetchExercises = (history: History, t: string | null) => {
  return (dispatch: ThunkDispatch<State, void, Action>): Promise<void> => {
    return axiosWithAuth(t)
      .get(`${api()}/api/auth/exercises`)
      .then(res => {
        dispatch({
          type: FETCH_EXERCISES_SUCCESS,
          payload: res.data.exercises
        });
      })
      .catch(err => {
        if (err.response) {
          dispatch({
            type: FETCH_EXERCISES_ERROR,
            payload: err.response.data.error
          });
        } else {
          history.push('/500');
        }
      });
  };
};

// delete an exercise
type TDeleteExercise = (
  t: string | null,
  id: string
) => (dispatch: ThunkDispatch<State, void, Action>) => Promise<Action>;

export const deleteExerciseAction: TDeleteExercise = (t, id) => {
  return async (dispatch): Promise<Action> => {
    await axiosWithAuth(t).delete(`${api()}/api/auth/exercises/${id}`);
    return dispatch({
      type: DELETE_SAVED_EXERCISE,
      payload: id
    });
  };
};

// create a new exercise
type TCreateExercise = (
  t: string | null,
  exercise: string,
  setMsg: React.Dispatch<React.SetStateAction<Msg>>
) => (dispatch: ThunkDispatch<State, void, Action>) => Promise<Action | void>;

export const createExerciseAction: TCreateExercise = (t, exercise, setMsg) => {
  return async (dispatch): Promise<Action | void> => {
    try {
      const res: AxiosResponse = await axiosWithAuth(t).post(
        `${api()}/api/auth/exercises`,
        {
          name: exercise
        }
      );
      if (setMsg) setMsg({ success: 'Exercise created' });
      return dispatch({ type: CREATE_EXERCISE, payload: res.data.exercise });
    } catch (error) {
      if (setMsg) return setMsg({ error: error.response.data.error });
    }
  };
};

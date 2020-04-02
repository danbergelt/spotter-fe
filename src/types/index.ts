import { Action } from 'redux';
import { Moment } from 'moment';

/*== Entities =====================================================

Entities --> objects returned from server, i.e. saved tags, saved
exercises, workouts, etc.

*/

export interface Entity {
  _id?: string;
}

export interface Tag extends Entity {
  color: string;
  content: string;
}

export interface SavedExercise extends Entity {
  name: string;
  user: string;
  createdAt: string;
  prDate?: string;
  pr?: number;
}

export interface Exercise extends Entity {
  name: string;
  weight: number | string;
  sets: number | string;
  reps: number | string;
}

export interface Template extends Entity {
  name: string;
  title: string;
  tags: Array<Tag>;
  notes: string;
  exercises: Array<Exercise>;
  user: string;
  createdAt: string;
}

export interface Workout extends Entity {
  date: string;
  title: string;
  notes: string;
  exercises: Array<Exercise>;
  tags: Array<Tag>;
  user?: string;
  createdAt?: string;
}

/*== Reducers =====================================================

Reducer types --> used to type global state

*/

export interface GlobalReducer {
  token: null | string;
}

export interface WorkoutReducer {
  title: string;
  notes: string;
  exercises: Array<Exercise>;
  tags: Array<Tag>;
  date: string | Moment;
  _id: null | string;
}

export interface WorkoutsReducer {
  workouts: Array<Workout>;
}

export interface State {
  globalReducer: GlobalReducer;
  workoutReducer: WorkoutReducer;
  workoutsReducer: WorkoutsReducer;
}

/*== Utility types =====================================================

A collection of types that are reused across the application, and are
sufficiently complex to be located within the types directory.

*/

export interface ReduxAction<T> extends Action {
  payload: T;
}

export type Scope = 'week' | 'month';

export type Ctx = 'add' | 'view' | '';

export interface HS {
  hovered: string | undefined;
  setHovered: React.Dispatch<React.SetStateAction<string | undefined>>;
  darken: <T>(comparands: [T, T], color: string) => string;
}

export type Date = Moment;

export interface Editing {
  exercise: Exercise;
  i: number;
}

export type TagExerciseUnion = Tag | SavedExercise;

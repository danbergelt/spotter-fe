import { Action } from 'redux';
import { Moment } from 'moment';
import { Exercise } from './Exercises';
import { Exercise as ExerciseOption } from './ExerciseOption';
import { TagOnWorkout } from './TagOnWorkout';

export interface ReduxAction<T> extends Action {
  payload: T;
}

export interface Entity {
  _id: string;
  // eslint-disable-next-line
  [key: string]: any;
}

export type Scope = 'week' | 'month';

export type Ctx = 'add' | 'view' | '';

export interface HS {
  hovered: string;
  setHovered: React.Dispatch<React.SetStateAction<string>>;
  darken: <T>(comparands: [T, T], color: string) => string;
}

export type Date = Moment;

export interface Editing {
  exercise: Exercise;
  i: number;
}

export type TagExUnion = TagOnWorkout | ExerciseOption;

import { Action } from 'redux';
import { Moment } from 'moment';
import { Exercise } from './Exercises';

export interface ReduxAction<T> extends Action {
  payload: T;
}

export type Scope = 'week' | 'month';

export type Ctx = 'add' | 'view';

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

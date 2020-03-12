import { Action } from 'redux';

export interface ReduxAction<T> extends Action {
  payload: T;
}

export type Scope = 'week' | 'month';

export type Ctx = 'add' | 'view';

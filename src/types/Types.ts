import { Action } from 'redux';

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

import { Queued, Exercise } from './Exercises';
import { Exercise as E } from './ExerciseOption';
import { TagOnWorkout as Tag } from './TagOnWorkout';
import { Workout } from './Workout';
import { Moment } from 'moment';

export interface GlobalReducer {
  t: null | string;
  ctx: null | string;
  scope: 'Week' | 'Month';
  date: null | Moment;
  timeSpan: number;
}

export interface WorkoutReducer {
  title: string;
  notes: string;
  exercises: Array<Exercise>;
  tags: Array<Tag>;
  queue: Partial<Queued>;
  _id: null | string;
}

export interface TagsReducer {
  tags: Array<Tag>;
}

export interface OptionsReducer {
  active: number;
  tagModal: boolean;
  confirmDelete: boolean;
  exercises: boolean;
  saveMsg: object;
}

export interface FetchWorkoutsReducer {
  workouts: Array<Workout>;
}

export interface FetchExercisesReducer {
  savedExercises: Array<E>;
}

export interface State {
  globalReducer: GlobalReducer;
  workoutReducer: WorkoutReducer;
  fetchExercisesReducer: FetchExercisesReducer;
  fetchWorkoutsReducer: FetchWorkoutsReducer;
  optionsReducer: OptionsReducer;
  tagsReducer: TagsReducer;
}

import { Queued, Exercise } from './Exercises';
import { Exercise as E } from './ExerciseOption';
import { TagOnWorkout as Tag } from './TagOnWorkout';
import { Workout } from './Workout';
import { Moment } from 'moment';
import { Template } from './Template';

export interface GlobalReducer {
  t: null | string;
  ctx: null | string;
  scope: { value: string; label: string };
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
  templateSave: boolean;
  fromTemplate: boolean;
  confirmDelete: boolean;
  exercises: boolean;
  templates: Array<Template>;
  templatesErr: string;
  saveMsg: object;
}

export interface FetchWorkoutsReducer {
  err: string | null;
  isLoading: boolean;
  workouts: Array<Workout>;
}

export interface FetchExercisesReducer {
  err: string | null;
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

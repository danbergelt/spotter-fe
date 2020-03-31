import { Queued, Exercise } from './Exercises';
import { TagOnWorkout as Tag } from './TagOnWorkout';
import { Workout } from './Workout';
import { Moment } from 'moment';

export interface GlobalReducer {
  t: null | string;
  ctx: null | 'add' | 'view';
  date: null | Moment;
}

export interface WorkoutReducer {
  title: string;
  notes: string;
  exercises: Array<Exercise>;
  tags: Array<Tag>;
  queue: Queued;
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

import { Exercise } from './Exercises';
import { TagOnWorkout as Tag } from './TagOnWorkout';
import { Workout } from './Workout';
import { Moment } from 'moment';

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

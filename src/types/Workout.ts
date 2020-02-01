import { Exercise } from './Exercises';
import { TagOnWorkout as Tag } from './TagOnWorkout';

export interface SavedExercise extends Exercise {
  _id: string;
}

export interface Workout {
  _id: string;
  date: string;
  title: string;
  notes: string;
  exercises: Array<SavedExercise>;
  tags: Array<Tag>;
  user: string;
  createdAt: string;
}

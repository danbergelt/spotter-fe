import { TagOnWorkout as Tag } from './TagOnWorkout';
import { Exercise } from './Exercises';

interface SavedExercise extends Exercise {
  _id: string;
}

export interface Template {
  _id: string;
  name: string;
  title: string;
  tags: Array<Tag>;
  notes: string;
  exercises: Array<SavedExercise>;
  user: string;
  createdAt: string;
}

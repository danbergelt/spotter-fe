export interface Queued {
  exercise?: {
    name: string;
    weight: number;
    sets: number;
    reps: number;
  };
  i?: number;
}

export interface Exercise {
  name: string;
  weight: number | string;
  sets: number | string;
  reps: number | string;
}

export type Refs = Array<React.RefObject<HTMLInputElement>>;

export interface Props {
  exercise: Exercise;
  i: number;
  handleQueue: (exercise: Exercise, i: number) => void;
  delExercise: (i: number) => void;
}

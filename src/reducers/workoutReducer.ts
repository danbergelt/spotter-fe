import {
  ADD_WORKOUT_TITLE,
  RESET_WORKOUT,
  RESET_NOTES,
  ADD_WORKOUT_NOTES,
  ADD_EXERCISE,
  TOGGLE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  FROM_TEMPLATE,
  DEL_EXERCISE,
  QUEUE_EDIT,
  HANDLE_EDIT,
  RESET_QUEUE,
  FROM_SAVED,
  CLOSE_WORKOUT_MODAL,
  OPEN_MODAL
} from '../constants/index';
import { find, isMatch, isEqual, omit, pick, keys, remove } from 'lodash';
import { WorkoutReducer } from 'src/types/State';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import { Template } from 'src/types/Template';
import { SavedExercise } from 'src/types/Workout';
import { AnyAction } from 'redux';
import produce from 'immer';

const workoutState: WorkoutReducer = {
  title: '',
  notes: '',
  exercises: [],
  tags: [],
  queue: {},
  _id: null
};

/* HELPER FUNCTIONS */

// Test an array of tags on a workout to determine if a toggled tag should be added or removed
type TestForMatches = (
  tags: Array<TagOnWorkout>,
  payload: TagOnWorkout
) => TagOnWorkout | undefined;

const testForMatches: TestForMatches = (tags, payload) =>
  find(tags, t => {
    return isMatch(t, omit(payload, ['__v', 'user']));
  });

// Test if a tag on a workout needs to be updated with hydrated tag data
type TestForUpdates = (
  tags: Array<TagOnWorkout>,
  payload: TagOnWorkout
) => TagOnWorkout | undefined;

const testForUpdates: TestForUpdates = (tags, payload) =>
  find(tags, t => {
    // again, omit irrelevant data from MongoDB and update the tag on the current workout
    return isMatch(
      omit(t, ['color', 'content', '__v', 'tag']),
      omit(payload, ['color', 'content', '__v', 'user'])
    );
  });

// Populate exercises on a workout from a saved template
const exercisesFromTemplate = (payload: Template): Array<SavedExercise> => {
  const exercises = {
    name: null,
    sets: null,
    reps: null,
    weight: null
  };
  return payload.exercises.map((el: object) =>
    pick(el, keys(exercises))
  ) as Array<SavedExercise>;
};

export const workoutReducer = (
  state = workoutState,
  action: AnyAction
): WorkoutReducer => {
  return produce(state, draft => {
    switch (action.type) {
      case OPEN_MODAL:
        if (action.payload.workout) {
          draft._id = action.payload.workout._id;
          draft.exercises = action.payload.workout.exercises;
          draft.notes = action.payload.workout.notes;
          draft.tags = action.payload.workout.tags;
          draft.title = action.payload.workout.title;
        }
        return;
      case ADD_WORKOUT_TITLE:
        draft.title = action.payload;
        return;
      case ADD_WORKOUT_NOTES:
        draft.notes = action.payload;
        return;
      case RESET_WORKOUT:
        draft.title = '';
        draft.notes = '';
        draft.exercises = [];
        draft.tags = [];
        return;
      case RESET_NOTES:
        draft.notes = '';
        return;
      case ADD_EXERCISE:
        draft.exercises.push(action.payload);
        return;
      case TOGGLE_TAG:
        // if workout contains tag, then toggle it off. if not, toggle it on
        testForMatches(draft.tags, action.payload)
          ? remove(draft.tags, tag => tag._id === action.payload._id)
          : draft.tags.push(action.payload);
        return;
      case DELETE_TAG:
        remove(draft.tags, tag => tag._id === action.payload._id);
        return;
      case UPDATE_TAG:
        // checks if updated tag is on current workout
        testForUpdates(draft.tags, action.payload) &&
          // loop through stale state, finds tag by id
          state.tags.forEach((tag, i) => {
            // if the current tag is the stale tag, overwrite at that index in draft
            if (isEqual(tag, testForUpdates(state.tags, action.payload))) {
              draft.tags[i] = action.payload;
            }
          });
        return;
      case FROM_TEMPLATE:
        draft.title = action.payload.title;
        // pick relevant keys, populate exercise state
        draft.exercises = exercisesFromTemplate(action.payload);
        draft.notes = action.payload.notes;
        draft.tags = action.payload.tags;
        return;
      case DEL_EXERCISE:
        draft.queue = {};
        remove(draft.exercises, (_, index) => index === action.payload);
        return;
      case QUEUE_EDIT:
        draft.queue = action.payload;
        return;
      case HANDLE_EDIT:
        draft.queue = {};
        draft.exercises.forEach((_, index) => {
          if (index === action.payload.i) {
            draft.exercises[index] = action.payload.exercise;
          }
        });
        return;
      case RESET_QUEUE:
        draft.queue = {};
        return;
      case FROM_SAVED:
        draft._id = action.payload._id;
        draft.exercises = action.payload.exercises;
        draft.notes = action.payload.notes;
        draft.tags = action.payload.tags;
        draft.title = action.payload.title;
        return;
      case CLOSE_WORKOUT_MODAL:
        draft.queue = {};
        draft.title = '';
        draft.notes = '';
        draft.exercises = [];
        draft.tags = [];
        return;
      default:
        return draft;
    }
  });
};

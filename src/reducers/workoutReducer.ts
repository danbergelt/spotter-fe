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
  FROM_SAVED
} from '../actions/workoutActions';
import { CLOSE_WORKOUT_MODAL } from '../actions/globalActions';
import { find, isMatch, isEqual, omit, pick, keys } from 'lodash';
import { WorkoutReducer } from 'src/types/State';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import { Template } from 'src/types/Template';
import { SavedExercise } from 'src/types/Workout';
import { AnyAction } from 'redux';

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
type ExercisesFromTemplate = (payload: Template) => Array<SavedExercise>;
const exercisesFromTemplate: ExercisesFromTemplate = payload => {
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

// contains active workout details to be shared globally

export const workoutReducer = (
  state = workoutState,
  action: AnyAction
): WorkoutReducer => {
  switch (action.type) {
    case ADD_WORKOUT_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case ADD_WORKOUT_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    case RESET_WORKOUT:
      return {
        ...state,
        title: '',
        notes: '',
        exercises: [],
        tags: []
      };
    case RESET_NOTES:
      return {
        ...state,
        notes: ''
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload]
      };
    case TOGGLE_TAG:
      return {
        ...state,
        tags: testForMatches(state.tags, action.payload)
          ? state.tags.filter(el => el._id !== action.payload._id)
          : [...state.tags, action.payload]
      };
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter(el => el._id !== action.payload._id)
      };
    case UPDATE_TAG:
      return {
        ...state,
        tags: testForUpdates(state.tags, action.payload)
          ? state.tags.map(t =>
              isEqual(t, testForUpdates(state.tags, action.payload))
                ? action.payload
                : t
            )
          : [...state.tags]
      };
    case FROM_TEMPLATE:
      return {
        ...state,
        title: action.payload.title,
        exercises: exercisesFromTemplate(action.payload),
        notes: action.payload.notes,
        tags: action.payload.tags
      };
    case DEL_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter((_, i) => i !== action.payload)
      };
    case QUEUE_EDIT:
      return {
        ...state,
        queue: action.payload
      };
    case HANDLE_EDIT:
      return {
        ...state,
        queue: {},
        exercises: state.exercises.map((exercise, i) =>
          i === action.payload.i ? action.payload.exercise : exercise
        )
      };
    case RESET_QUEUE:
      return {
        ...state,
        queue: {}
      };
    case FROM_SAVED:
      return {
        ...state,
        _id: action.payload._id,
        exercises: action.payload.exercises,
        notes: action.payload.notes,
        tags: action.payload.tags,
        title: action.payload.title
      };
    case CLOSE_WORKOUT_MODAL:
      return {
        ...state,
        queue: {},
        title: '',
        notes: '',
        exercises: [],
        tags: []
      };
    default:
      return state;
  }
};

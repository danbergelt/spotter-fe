import { WorkoutReducer } from 'src/types/State';
import { TagExUnion } from 'src/types/Types';

// replace every k/v pair in a stale state with a hydrated state
const replaceAll = (stale: WorkoutReducer, hydrated: WorkoutReducer): void => {
  Object.keys(stale).forEach(k => {
    stale[k] = hydrated[k];
  });
};

// replace one k/v pair in a stale state
const replaceOne = (stale: TagExUnion[], replacement: TagExUnion): void => {
  const idx = stale.findIndex(element => element._id === replacement._id);
  stale[idx] = replacement;
};

// validates that an object exists in an array
const exists = (arr: TagExUnion[], comp: string): boolean => {
  return arr.some(element => element._id === comp);
};

// removes a nested object from an array with an unknown index
const remove = (arr: TagExUnion[], comp: string): void => {
  const idx = arr.findIndex(element => element._id === comp);
  arr.splice(idx, 1);
};

export default {
  replaceAll,
  replaceOne,
  exists,
  remove
};

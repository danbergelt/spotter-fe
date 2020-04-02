import { Entity } from 'src/types/Types';

// replace every k/v pair in a stale state with a hydrated state
const replaceAll = <T>(stale: T, hydrated: Partial<T>): void => {
  Object.keys(stale).forEach(k => {
    if (hydrated[k]) {
      stale[k] = hydrated[k];
    }
  });
};

// replace an object in an array according to a required id
const replaceOne = (stale: Array<Entity>, replacement: Entity): void => {
  const idx = stale.findIndex(element => element._id === replacement._id);
  stale[idx] = replacement;
};

// validates that an object exists in an array
const exists = (arr: Array<Entity>, comp: string): boolean => {
  return arr.some(element => element._id === comp);
};

// removes a nested object from an array with an unknown index
const remove = (arr: Array<Entity>, comp: string): void => {
  const idx = arr.findIndex(element => element._id === comp);
  arr.splice(idx, 1);
};

export default {
  replaceAll,
  replaceOne,
  exists,
  remove
};

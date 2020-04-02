import { reducer } from '../../../reducers/index';
import { LOGOUT } from 'src/constants/index';
import { WorkoutReducer, WorkoutsReducer } from 'src/types';

const mockReducer = {
  globalReducer: { token: 'token' },
  workoutReducer: {} as WorkoutReducer,
  workoutsReducer: {} as WorkoutsReducer
};

describe('logout', () => {
  test('should handle LOGOUT', () => {
    const newReducer = reducer(mockReducer, { type: LOGOUT });
    expect(newReducer.globalReducer.token).toBe(null);
  });
});

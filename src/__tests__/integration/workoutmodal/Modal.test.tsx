import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import WorkoutModal from 'src/components/dash/workoutmodal/WorkoutModal';
import { reducer } from 'src/reducers';
import Modal from 'react-modal';

const closeModal = jest.fn();

describe('workout modal', () => {
  beforeAll(() => {
    Modal.setAppElement(document.createElement('div'));
  });

  test('renders when open', () => {
    const { queryByTestId } = wrapper(
      reducer,
      <WorkoutModal modal={true} closeModal={closeModal} time={0} />
    );

    expect(queryByTestId(/exit-modal/i)).toBeTruthy();
  });

  test('does not render when closed', () => {
    const { queryByTestId } = wrapper(
      reducer,
      <WorkoutModal modal={false} closeModal={closeModal} time={0} />
    );

    expect(queryByTestId(/exit-modal/i)).toBeFalsy();
  });
});

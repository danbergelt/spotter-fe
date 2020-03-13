import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MoreWorkouts from 'src/components/dash/workouts/month/MoreWorkouts';
import mockWorkoutRes from 'src/__testUtils__/mockMultipleWorkouts';
import moment from 'moment';

const workouts = mockWorkoutRes.data.workouts;
const date = moment().startOf('week');
const openModal = jest.fn();

describe('view more workouts popup for grid view', () => {
  test('renders', () => {
    const { getByText } = render(
      <MoreWorkouts workouts={workouts} date={date} openModal={openModal} />
    );

    const more = getByText(/view more/i);

    fireEvent.click(more);

    getByText(/workout for testing/i);
    getByText(/leg day/i);
  });

  test('fires openmodal on workout click', () => {
    const { getByText } = render(
      <MoreWorkouts workouts={workouts} date={date} openModal={openModal} />
    );

    const more = getByText(/view more/i);

    fireEvent.click(more);

    fireEvent.click(getByText(/leg day/i));

    expect(openModal).toHaveBeenCalledTimes(1);
  });
});

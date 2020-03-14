import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cell from 'src/components/dash/views/month/Cell';
import moment from 'moment';
import mockWorkoutRes from 'src/__testUtils__/mockMultipleWorkouts';
import mqPolyfill from 'mq-polyfill';

const date = moment().startOf('week');
const openModal = jest.fn();

describe('grid cell', () => {
  beforeAll(() => {
    mqPolyfill(window);
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height
      }).dispatchEvent(new this.Event('resize'));
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('cell renders', () => {
    const { getByText } = render(
      <Cell
        date={date}
        i={0}
        openModal={openModal}
        workouts={mockWorkoutRes.data.workouts}
      />
    );
    getByText(/workout for testing/i);
    getByText(date.format('ddd'));
    getByText(date.format('D'));
    getByText(/view more/i);
  });

  test('slices title at 800 viewport width', () => {
    window.resizeTo(800, 1000);
    const { getByText } = render(
      <Cell
        date={date}
        i={0}
        openModal={openModal}
        workouts={mockWorkoutRes.data.workouts}
      />
    );
    getByText(/work.../i);
    window.resizeTo(1000, 1000);
  });

  test('calls openmodal on workout click', () => {
    const { getByText } = render(
      <Cell
        date={date}
        i={0}
        openModal={openModal}
        workouts={mockWorkoutRes.data.workouts}
      />
    );

    fireEvent.click(getByText(/workout for testing/i));
    expect(openModal).toHaveBeenCalledTimes(1);
  });

  test('calls openmodal on add workout click', () => {
    const { getByTestId } = render(
      <Cell
        date={date}
        i={0}
        openModal={openModal}
        workouts={mockWorkoutRes.data.workouts}
      />
    );

    fireEvent.click(getByTestId(/add/i));
    expect(openModal).toHaveBeenCalledTimes(1);
  });

  test('opens more workouts dropdown', () => {
    const { getByText } = render(
      <Cell
        date={date}
        i={0}
        openModal={openModal}
        workouts={mockWorkoutRes.data.workouts}
      />
    );

    fireEvent.click(getByText(/view more/i));
    getByText(/leg day/i);
  });

  test('does not render view more if only one workout', () => {
    const { queryByText } = render(
      <Cell
        date={date}
        i={0}
        openModal={openModal}
        workouts={[mockWorkoutRes.data.workouts[0]]}
      />
    );

    expect(queryByText(/view more/i)).toBeFalsy();
  });

  test('does not render workout in cell if dates do not match', () => {
    const { queryByText } = render(
      <Cell
        date={date.subtract(100, 'day')}
        i={0}
        openModal={openModal}
        workouts={[mockWorkoutRes.data.workouts[0]].filter(
          workout => workout.date === date.format('MMM DD YYYY')
        )}
      />
    );

    expect(queryByText(/workout for testing/i)).toBeFalsy();
  });

  test('does not render weekday if not in first row', () => {
    const { queryByText } = render(
      <Cell
        date={date.subtract(1, 'day')}
        i={16}
        openModal={openModal}
        workouts={[mockWorkoutRes.data.workouts[0]]}
      />
    );

    expect(queryByText(date.format('ddd'))).toBeFalsy();
  });
});

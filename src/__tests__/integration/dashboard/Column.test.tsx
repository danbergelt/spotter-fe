import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Column from 'src/components/dash/workouts/week/Column';
import moment from 'moment';
import mockWorkoutRes from 'src/__testUtils__/mockMultipleWorkouts';
import mqPolyfill from 'mq-polyfill';

const date = moment().startOf('week');
const openModal = jest.fn();
const workouts = mockWorkoutRes.data.workouts;

describe('column for weekly view', () => {
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

  test('renders', () => {
    const { getByText, getAllByText } = render(
      <Column date={date} openModal={openModal} workouts={workouts} />
    );
    getByText(date.format('ddd'));
    getByText(date.format('D'));
    getByText(/workout for testing/i);
    getByText(/leg day/i);
    getAllByText(/^tag2$/i);
  });

  test('add workout opens modal', () => {
    const { getByTestId } = render(
      <Column date={date} openModal={openModal} workouts={workouts} />
    );

    fireEvent.click(getByTestId(/add/i));
    expect(openModal).toHaveBeenCalledTimes(1);
  });

  test('slices add workout text on tablet', () => {
    window.resizeTo(800, 1000);
    const { getByText } = render(
      <Column date={date} openModal={openModal} workouts={workouts} />
    );

    getByText(/^add$/i);
  });

  test('removes add workout text on mobile', () => {
    window.resizeTo(500, 1000);
    const { queryByText } = render(
      <Column date={date} openModal={openModal} workouts={workouts} />
    );

    expect(queryByText(/add/i)).toBeFalsy();
  });
});

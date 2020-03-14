import React from 'react';
import { render } from '@testing-library/react';
import Card from 'src/components/dash/views/week/Card';
import { workout } from '../../../__testUtils__/workout';
import mqPolyfill from 'mq-polyfill';

describe('workout card', () => {
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

  test('renders workout data passed in as prop', () => {
    const { getByText, getByTestId } = render(<Card workout={workout} />);

    getByText(workout.title);
    getByText(workout.tags[0].content.toUpperCase());
    getByTestId(/content/i);
  });

  test('slices workout title at width <= 500', () => {
    window.resizeTo(500, 1000);

    const { getByText } = render(<Card workout={workout} />);

    getByText(`${workout.title.slice(0, 3)}...`);
  });

  test('slices tag content at width <= 750', () => {
    window.resizeTo(750, 1000);

    const { getByText } = render(<Card workout={workout} />);

    getByText(`${workout.tags[0].content.toUpperCase().slice(0, 2)}...`);
  });
});

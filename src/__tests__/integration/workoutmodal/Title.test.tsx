import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Title from 'src/components/dash/workoutmodal/Title';
import { fireEvent } from '@testing-library/dom';

const closeModal = jest.fn();

describe('workout modal title', () => {
  test('renders', () => {
    const { queryByTestId } = wrapper(
      reducer,
      <Title closeModal={closeModal} />
    );
    expect(queryByTestId(/inp/i)).toBeTruthy();
  });

  test('can be typed in', () => {
    const { getByTestId } = wrapper(reducer, <Title closeModal={closeModal} />);

    const title = getByTestId(/inp/i);
    expect(title.getAttribute('value')).toBe('');
    fireEvent.change(title, { target: { value: 'foo' } });
    expect(title.getAttribute('value')).toBe('foo');
  });

  test('exits modal on exit click', () => {
    const { getByTestId } = wrapper(reducer, <Title closeModal={closeModal} />);

    fireEvent.click(getByTestId(/exit-modal/i));

    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});

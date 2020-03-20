import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Create from 'src/components/dash/workoutmodal/actions/exercises/Create';
import { fireEvent, wait } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

describe('create workout', () => {
  test('input can be typed in', async () => {
    const { getByPlaceholderText } = wrapper(reducer, <Create />);

    const input = getByPlaceholderText(/e.g. squat/i);

    await act(async () => {
      await fireEvent.change(input, { target: { value: 'foo' } });
    });

    expect(input.getAttribute('value')).toBe('foo');
  });

  test('displays form validation', async () => {
    const { getByText, getByPlaceholderText } = wrapper(reducer, <Create />);

    fireEvent.click(getByText(/create/i));

    await wait(() => expect(getByText(/enter name/i)).toBeTruthy());

    const input = getByPlaceholderText(/e.g. squat/i);

    await act(async () => {
      await fireEvent.change(input, {
        target: {
          value:
            'this is an insanely long exercise name. what are you thinking? no exercise name should be this long. you wot m8?'
        }
      });
    });

    await wait(() => expect(getByText(/25 character max/i)).toBeTruthy());
  });
});

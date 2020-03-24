import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Create from 'src/components/dash/workoutmodal/actions/exercises/Create';
import { fireEvent, wait } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

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

  test('displays error message on failure', async () => {
    mockAxios.post.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });

    const { getByPlaceholderText, getByText } = wrapper(reducer, <Create />);

    const input = getByPlaceholderText(/e.g. squat/i);

    await act(async () => {
      await fireEvent.change(input, { target: { value: 'foo' } });
    });

    fireEvent.click(getByText(/create/i));

    await wait(() => expect(getByText(/foobar/i)).toBeTruthy());
  });

  test('displays success message on success', async () => {
    mockAxios.post.mockResolvedValue({ data: 'foobar' });

    const { getByPlaceholderText, getByText } = wrapper(reducer, <Create />);

    const input = getByPlaceholderText(/e.g. squat/i);

    await act(async () => {
      await fireEvent.change(input, { target: { value: 'foo' } });
    });

    fireEvent.click(getByText(/create/i));

    await wait(() => expect(getByText(/exercise created/i)).toBeTruthy());
  });
});

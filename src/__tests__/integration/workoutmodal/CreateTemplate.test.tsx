import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Create from 'src/components/dash/workoutmodal/actions/templates/Create';
import { fireEvent, wait } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const setTemplates = jest.fn();

describe('create new workout template', () => {
  test('input can be typed in', async () => {
    const { getByTestId } = wrapper(
      reducer,
      <Create setTemplates={setTemplates} />
    );

    const input = getByTestId(/input/i);

    await act(async () => {
      await fireEvent.change(input, { target: { value: 'foo' } });
    });

    expect(input.getAttribute('value')).toBe('foo');
  });

  test('displays form validation', async () => {
    const { getByTestId, getByText } = wrapper(
      reducer,
      <Create setTemplates={setTemplates} />
    );

    const input = getByTestId(/input/i);

    fireEvent.click(getByTestId(/button/i));

    await wait(() => getByText(/enter name/i));

    await act(async () => {
      await fireEvent.change(input, {
        target: { value: 'fjwiofjiowfjwiojfiowfjiowjfiowjfwfjdiowfjiowjfowfoj' }
      });
    });

    await wait(() => getByText(/20 character max/i));
  });

  test('displays error message on failure', async () => {
    mockAxios.post.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });

    const { getByTestId, getByText } = wrapper(
      reducer,
      <Create setTemplates={setTemplates} />
    );

    const input = getByTestId(/input/i);

    await act(async () => {
      await fireEvent.change(input, {
        target: { value: 'template' }
      });
    });

    fireEvent.click(getByTestId(/button/i));

    await wait(() => getByText(/foobar/i));
  });

  test('displays success message on success', async () => {
    mockAxios.post.mockResolvedValue({ data: 'foobar' });

    const { getByTestId, getByText } = wrapper(
      reducer,
      <Create setTemplates={setTemplates} />
    );

    const input = getByTestId(/input/i);

    await act(async () => {
      await fireEvent.change(input, {
        target: { value: 'template' }
      });
    });

    fireEvent.click(getByTestId(/button/i));

    await wait(() => getByText(/template created/i));
  });
});

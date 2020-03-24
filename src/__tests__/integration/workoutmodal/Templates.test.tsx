import React from 'react';
import Templates from 'src/components/dash/workoutmodal/actions/templates/Templates';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import axios from 'axios';
import { t1 } from 'src/__testUtils__/template';
import { fireEvent, wait } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const nudgeBottom = jest.fn();
const nudgeLeft = jest.fn();

describe('templates popup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('can open popup', async () => {
    mockAxios.get.mockResolvedValue({ data: { templates: [t1] } });
    const { getByText } = wrapper(
      reducer,
      <Templates nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
    );
    const button = getByText(/templates/i);

    fireEvent.click(button);

    await wait(() => getByText(t1.name));
  });

  test('deleted template removes from popup', async () => {
    mockAxios.get.mockResolvedValue({ data: { templates: [t1] } });
    mockAxios.delete.mockResolvedValue({ data: { template: t1 } });
    const { getByText, getByTestId } = wrapper(
      reducer,
      <Templates nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
    );
    const button = getByText(/templates/i);

    fireEvent.click(button);

    await wait(() => getByText(t1.name));

    await act(async () => {
      await fireEvent.click(getByTestId(/template-delete/i));
    });

    await wait(() => getByText(/no templates found/i));
  });

  test('can close popup', async () => {
    mockAxios.get.mockResolvedValue({ data: { templates: [t1] } });
    const { getByText, getByTestId, queryByText } = wrapper(
      reducer,
      <Templates nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
    );
    const button = getByText(/templates/i);

    fireEvent.click(button);

    await wait(() => getByText(t1.name));

    fireEvent.click(getByTestId(/close/i));

    expect(queryByText(t1.name)).toBeFalsy();
  });

  test('can switch between tabs', async () => {
    mockAxios.get.mockResolvedValue({ data: { templates: [t1] } });
    const { getByText, queryByPlaceholderText } = wrapper(
      reducer,
      <Templates nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
    );
    const button = getByText(/templates/i);

    fireEvent.click(button);

    await wait(() => getByText(t1.name));

    expect(queryByPlaceholderText(/e.g. leg day/i)).toBeFalsy();

    fireEvent.click(getByText(/create/i));

    expect(queryByPlaceholderText(/e.g. leg day/i)).toBeTruthy();

    fireEvent.click(getByText(/manage/i));

    expect(queryByPlaceholderText(/e.g. leg day/i)).toBeFalsy();
  });
});

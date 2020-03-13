import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Dashboard from '../../../pages/Dashboard';
import axios from 'axios';
import Modal from 'react-modal';
import mockWorkoutRes from 'src/__testUtils__/mockWorkoutRes';
import { wait, fireEvent } from '@testing-library/dom';
import moment from 'moment';
import { act } from 'react-dom/test-utils';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const date = moment().format('MMMM YYYY');
Modal.setAppElement(document.createElement('div'));

describe('workouts component', () => {
  test('renders columns by default', async () => {
    mockAxios.post.mockResolvedValue(mockWorkoutRes);
    const { getByText, getByTestId } = wrapper(reducer, <Dashboard />);
    await wait(() => expect(getByText(/workout for testing/i)).toBeTruthy());
    getByTestId(/cols/i);
  });

  test('can toggle scopes', async () => {
    mockAxios.post.mockResolvedValue(mockWorkoutRes);
    const { getByText, getByTestId } = wrapper(reducer, <Dashboard />);
    await wait(() => expect(getByText(/workout for testing/i)).toBeTruthy());

    fireEvent.click(getByText(/week/i));
    fireEvent.click(getByText(/month/i));

    await wait(() => expect(getByTestId(/grid/i)).toBeTruthy());

    fireEvent.click(getByText(/month/i));
    fireEvent.click(getByText(/week/i));

    await wait(() => expect(getByTestId(/cols/i)).toBeTruthy());
  });

  test('can traverse time periods in weekly view', async () => {
    mockAxios.post.mockResolvedValue(mockWorkoutRes);
    const { queryByText, getByText, getByTestId } = wrapper(
      reducer,
      <Dashboard />
    );
    await wait(() => expect(getByText(/workout for testing/i)).toBeTruthy());

    await act(async () => {
      await fireEvent.click(getByTestId(/back/i));
    });
    await act(async () => {
      await fireEvent.click(getByTestId(/back/i));
    });
    await act(async () => {
      await fireEvent.click(getByTestId(/back/i));
    });
    await act(async () => {
      await fireEvent.click(getByTestId(/back/i));
    });

    expect(queryByText(date)).toBeFalsy();

    await act(async () => {
      await fireEvent.click(getByTestId(/forward/i));
    });
    await act(async () => {
      await fireEvent.click(getByTestId(/forward/i));
    });
    await act(async () => {
      await fireEvent.click(getByTestId(/forward/i));
    });
    await act(async () => {
      await fireEvent.click(getByTestId(/forward/i));
    });

    expect(queryByText(date)).toBeTruthy();
  });

  test('can traverse time periods in monthly view', async () => {
    mockAxios.post.mockResolvedValue(mockWorkoutRes);
    const { queryByText, getByText, getByTestId } = wrapper(
      reducer,
      <Dashboard />
    );
    await wait(() => expect(getByText(/workout for testing/i)).toBeTruthy());
    fireEvent.click(getByText(/week/i));
    fireEvent.click(getByText(/month/i));

    await wait(() => expect(getByTestId(/grid/i)).toBeTruthy());

    await act(async () => {
      await fireEvent.click(getByTestId(/back/i));
    });

    expect(queryByText(date)).toBeFalsy();

    await act(async () => {
      await fireEvent.click(getByTestId(/forward/i));
    });

    expect(queryByText(date)).toBeTruthy();
  });

  test('can open add workout modal', async () => {
    mockAxios.post.mockResolvedValue(mockWorkoutRes);
    const { queryByTestId, getByText, getAllByText } = wrapper(
      reducer,
      <Dashboard />
    );
    await wait(() => expect(getByText(/workout for testing/i)).toBeTruthy());

    expect(queryByTestId(/exit-modal/i)).toBeFalsy();

    fireEvent.click(getAllByText(/add workout/i)[0]);

    expect(queryByTestId(/exit-modal/i)).toBeTruthy();
  });

  test('can open view workout modal', async () => {
    mockAxios.post.mockResolvedValue(mockWorkoutRes);
    const { queryByTestId, getByText } = wrapper(reducer, <Dashboard />);
    await wait(() => expect(getByText(/workout for testing/i)).toBeTruthy());

    expect(queryByTestId(/exit-modal/i)).toBeFalsy();

    fireEvent.click(getByText(/workout for testing/i));

    expect(queryByTestId(/exit-modal/i)).toBeTruthy();
  });
});

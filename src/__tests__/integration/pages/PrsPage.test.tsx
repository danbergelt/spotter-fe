import React from 'react';
import Prs from '../../../pages/Prs';
import { wait } from '@testing-library/react';
import wrapper from '../../../__testUtils__/wrapper';
import { reducer } from '../../../reducers/index';
import axios from 'axios';
import moment from 'moment';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const exercises = [
  { name: 'squat', prDate: moment().format('MMM DD YYYY'), pr: 100 },
  {
    name: 'deadlift',
    prDate: moment()
      .subtract(2, 'months')
      .format('MMM DD YYYY'),
    pr: 100
  },
  {
    name: 'bench',
    prDate: moment()
      .subtract(2, 'years')
      .format('MMM DD YYYY'),
    pr: 100
  }
];

describe('Prs page functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays pr', async () => {
    mockAxios.get.mockResolvedValue({ data: { exercises } });
    const { getByText, queryByText } = wrapper(reducer, <Prs />);

    await wait(() => getByText(/last month/i));

    expect(queryByText(/squat/i)).toBeTruthy();

    expect(queryByText(/deadlift/i)).toBeTruthy();

    expect(queryByText(/bench/i)).toBeTruthy();
  });

  test('displays no range found', async () => {
    mockAxios.get.mockResolvedValue({ data: { exercises: [] } });
    const { getByText, getAllByText } = wrapper(reducer, <Prs />);

    await wait(() => getByText(/last month/i));

    expect(getAllByText(/no prs in this range/i)).toBeTruthy();
  });
});

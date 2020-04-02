import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Controls from '../../../components/dash/controls/Controls';
import { setHead } from 'src/utils/momentUtils';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/dom';

const week = setHead(0, 'week');
const month = setHead(0, 'month');
const setTime = jest.fn();

describe('dash controls', () => {
  test('renders current date', () => {
    const { getByText } = wrapper(
      reducer,
      <Controls setTime={setTime} time={0} scope='week' setHead={setHead} />
    );

    getByText(week);
  });

  test('shows decremented weeks', () => {
    const { queryByText } = wrapper(
      reducer,
      <Controls setTime={setTime} time={-5} scope='week' setHead={setHead} />
    );

    expect(queryByText(week)).toBeFalsy();
  });

  test('shows incremented weeks', () => {
    const { queryByText } = wrapper(
      reducer,
      <Controls setTime={setTime} time={5} scope='week' setHead={setHead} />
    );

    expect(queryByText(week)).toBeFalsy();
  });

  test('shows decremented months', () => {
    const { queryByText } = wrapper(
      reducer,
      <Controls setTime={setTime} time={-1} scope='month' setHead={setHead} />
    );

    expect(queryByText(month)).toBeFalsy();
  });

  test('shows incremented months', () => {
    const { queryByText } = wrapper(
      reducer,
      <Controls setTime={setTime} time={1} scope='month' setHead={setHead} />
    );

    expect(queryByText(month)).toBeFalsy();
  });

  test('prs link works', () => {
    const { getByText, history } = wrapper(
      reducer,
      <Controls setTime={setTime} time={1} scope='month' setHead={setHead} />
    );

    fireEvent.click(getByText(/prs/i));

    expect(history.location.pathname).toEqual('/prs');
  });
});

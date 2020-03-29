import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Controls from '../../../components/dash/controls/Controls';
import { setHead } from 'src/utils/momentUtils';
import moment from 'moment';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/dom';

const date = moment().format('MMMM YYYY');

describe('dash controls', () => {
  test('renders current date', () => {
    const { getByText } = wrapper(
      reducer,
      <Controls time={0} scope='week' setHead={setHead} />
    );

    getByText(date);
  });

  test('shows decremented weeks', () => {
    const { queryByText } = wrapper(
      reducer,
      <Controls time={-5} scope='week' setHead={setHead} />
    );

    expect(queryByText(date)).toBeFalsy();
  });

  test('shows incremented weeks', () => {
    const { queryByText } = wrapper(
      reducer,
      <Controls time={5} scope='week' setHead={setHead} />
    );

    expect(queryByText(date)).toBeFalsy();
  });

  test('shows decremented months', () => {
    const { queryByText } = wrapper(
      reducer,
      <Controls time={-1} scope='month' setHead={setHead} />
    );

    expect(queryByText(date)).toBeFalsy();
  });

  test('shows incremented months', () => {
    const { queryByText } = wrapper(
      reducer,
      <Controls time={1} scope='month' setHead={setHead} />
    );

    expect(queryByText(date)).toBeFalsy();
  });

  test('prs link works', () => {
    const { getByText, history } = wrapper(
      reducer,
      <Controls time={1} scope='month' setHead={setHead} />
    );

    fireEvent.click(getByText(/prs/i));

    expect(history.location.pathname).toEqual('/prs');
  });
});

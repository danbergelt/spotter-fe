import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AltLink from 'src/components/util/AltLink';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('alt link tests', () => {
  test('alt link component renders', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <AltLink content='foo' path='/bar' linkContent='baz' />
      </Router>
    );
    expect(getByText(/foo/i)).toBeTruthy();
    expect(getByText(/baz/i)).toBeTruthy();
  });

  test('pushes user on link click', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <AltLink content='foo' path='/bar' linkContent='baz' />
      </Router>
    );
    const link = getByText(/baz/i);
    fireEvent.click(link);
    expect(history.location.pathname).toEqual('/bar');
  });
});

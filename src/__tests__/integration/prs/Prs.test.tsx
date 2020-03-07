import React from 'react';
import { render } from '@testing-library/react';
import Pr from 'src/components/prs/Pr';
import { e1 } from 'src/__testUtils__/exercise';

describe('PRs component', () => {
  test('renders all pr data', () => {
    const { getByText } = render(<Pr i={0} exercise={e1} />);
    getByText(e1.name);
    getByText(e1.prDate);
    getByText(`${e1.pr}lbs`);
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PrGroup from 'src/components/prs/PrGroup';
import { e1 } from 'src/__testUtils__/exercise';

describe('prs group', () => {
  test('prs group renders data', () => {
    const { getByText } = render(<PrGroup title='Last Month' prs={[e1]} />);
    getByText(/last month/i);
    getByText(e1.name);
    getByText(e1.prDate);
    getByText(`${e1.pr}lbs`);
  });

  test('renders message when no prs in range', () => {
    const { getByText } = render(<PrGroup title='Last Month' prs={[]} />);
    getByText(/no prs in this range/i);
  });

  test('can toggle pr visibility', () => {
    const { getByText, queryByText } = render(
      <PrGroup title='Last Month' prs={[e1]} />
    );

    const toggler = getByText(/last month/i);
    getByText(e1.name);
    fireEvent.click(toggler);
    expect(queryByText(e1.name)).toBeFalsy();
    fireEvent.click(toggler);
    getByText(e1.name);
  });
});

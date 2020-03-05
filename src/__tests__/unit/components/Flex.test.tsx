import React from 'react';
import { render } from '@testing-library/react';
import Flex from 'src/components/util/Flex';
import '@testing-library/jest-dom/extend-expect';

describe('flex component', () => {
  test('renders children', () => {
    const { getByText } = render(
      <Flex>
        <div>foo</div>
      </Flex>
    );

    getByText(/foo/i);
  });

  test('sb prop', () => {
    const { getByTestId, rerender } = render(
      <Flex sb>
        <div>foo</div>
      </Flex>
    );

    expect(getByTestId(/flex/i)).toHaveStyle('justify-content: space-between');

    rerender(
      <Flex>
        <div>bar</div>
      </Flex>
    );

    expect(getByTestId(/flex/i)).not.toHaveStyle(
      'justify-content: space-between'
    );
  });
});

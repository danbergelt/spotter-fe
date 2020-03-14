import React from 'react';
import { render } from '@testing-library/react';
import Flex from 'src/components/lib/Flex';
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
});

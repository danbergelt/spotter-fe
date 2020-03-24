import React from 'react';
import { render } from '@testing-library/react';
import FormError from 'src/components/lib/FormError';

describe('form error utility component', () => {
  test('can render form error', () => {
    const { queryByText } = render(
      <FormError node='foo' touched={{ foo: true }} errors={{ foo: 'bar' }} />
    );

    expect(queryByText(/bar/i)).toBeTruthy();
  });

  test("doesn't render if node is not touched", () => {
    const { queryByText } = render(
      <FormError node='foo' touched={{ foo: false }} errors={{ foo: 'bar' }} />
    );

    expect(queryByText(/bar/i)).toBeFalsy();
  });

  test("doesn't render if touched and no errors", () => {
    const { queryByTestId } = render(
      <FormError
        node='foo'
        touched={{ foo: true }}
        errors={{ foo: undefined }}
      />
    );

    expect(queryByTestId(/error/i)).toBeFalsy();
  });
});

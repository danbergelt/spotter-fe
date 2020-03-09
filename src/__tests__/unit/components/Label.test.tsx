import React from 'react';
import { render } from '@testing-library/react';
import Label from 'src/components/lib/Label';

describe('Label utility component', () => {
  test('can render label', () => {
    const { queryByText } = render(<Label content='foo' input='bar' />);
    expect(queryByText(/foo/i)).toBeTruthy();
  });

  test('pairs label with input passed as prop', () => {
    const { getByText } = render(<Label content='foo' input='bar' />);
    const label = getByText(/foo/i) as HTMLLabelElement;
    expect(label.htmlFor).toEqual('bar');
  });
});

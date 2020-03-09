import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from 'src/components/lib/Input';

describe('Input utility component', () => {
  test('can render input', () => {
    const onChange = jest.fn();
    const { queryByTestId } = render(
      <Input
        name='foo'
        placeholder='bar'
        type='text'
        value=''
        onChange={onChange}
      />
    );
    expect(queryByTestId(/input/i)).toBeTruthy();
  });

  test('can assign name + placeholder + value + type based on props', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Input
        name='foo'
        placeholder='bar'
        type='number'
        value={1}
        onChange={onChange}
      />
    );
    const input = getByTestId(/input/i) as HTMLInputElement;
    expect(input.name).toEqual('foo');
    expect(input.placeholder).toEqual('bar');
    expect(input.value).toEqual('1');
    expect(input.type).toEqual('number');
  });

  test('value is controlled by parent component', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Input
        name='foo'
        placeholder='bar'
        type='text'
        value='baz'
        onChange={onChange}
      />
    );
    const input = getByTestId(/input/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'foo' } });

    expect(input.value).toEqual('baz');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

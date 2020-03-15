import React from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import Notes from 'src/components/dash/workoutmodal/Notes';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/dom';

const placeholder = 'Click to enter some notes...';

describe('workout notes', () => {
  test('renders', () => {
    const { queryByPlaceholderText } = wrapper(reducer, <Notes />);

    expect(queryByPlaceholderText(placeholder)).toBeTruthy();
  });

  test('can be typed in', () => {
    const { container, getByPlaceholderText } = wrapper(reducer, <Notes />);

    const notes = getByPlaceholderText(placeholder);
    fireEvent.change(notes, { target: { value: 'foo' } });
    expect(container.innerHTML).toMatch('foo');
  });

  test('does not show edit button when input is empty', () => {
    const { queryByText } = wrapper(reducer, <Notes />);
    expect(queryByText(/edit/i)).toBeFalsy();
  });

  test('edit button focuses text area', () => {
    const { getByText, getByPlaceholderText } = wrapper(reducer, <Notes />);
    const notes = getByPlaceholderText(placeholder);
    expect(document.activeElement).not.toEqual(notes);
    fireEvent.change(notes, { target: { value: 'foo' } });
    fireEvent.click(getByText(/edit/i));
    expect(document.activeElement).toEqual(notes);
  });

  test('trash button empties textarea', () => {
    const { container, getByTestId, getByPlaceholderText } = wrapper(
      reducer,
      <Notes />
    );
    const notes = getByPlaceholderText(placeholder);
    fireEvent.change(notes, { target: { value: 'foo' } });
    expect(container.innerHTML).toMatch('foo');
    fireEvent.focus(notes);
    fireEvent.mouseDown(getByTestId(/trash/i));
    expect(container.innerHTML).not.toMatch('foo');
  });
});

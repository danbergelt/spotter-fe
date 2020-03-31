import React, { useState } from 'react';
import wrapper from 'src/__testUtils__/wrapper';
import { reducer } from 'src/reducers';
import { t1 } from '../../../__testUtils__/template';
import Manage from 'src/components/dash/workoutmodal/actions/templates/Manage';
import { fireEvent, wait } from '@testing-library/dom';
import axios from 'axios';
import { Template } from 'src/types/Template';
import WorkoutModal from 'src/components/dash/workoutmodal/WorkoutModal';
import Modal from 'react-modal';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const setTemplates = jest.fn();
const setIsOpen = jest.fn();
const templateState = [t1];

const TestManage = () => {
  const [templates, setTemplates] = useState<Array<Template>>(templateState);
  return (
    <Manage
      setIsOpen={setIsOpen}
      templates={templates}
      setTemplates={setTemplates}
    />
  );
};

describe('manage templates', () => {
  beforeAll(() => {
    Modal.setAppElement(document.createElement('div'));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders', () => {
    const { getByText } = wrapper(reducer, <TestManage />);

    getByText(t1.name);
  });

  test('renders message when no templates found', () => {
    const { getByText } = wrapper(
      reducer,
      <Manage
        setIsOpen={setIsOpen}
        setTemplates={setTemplates}
        templates={[]}
      />
    );

    getByText(/no templates found/i);
  });

  test('search filter works', () => {
    const { getByText, getByTestId } = wrapper(reducer, <TestManage />);

    fireEvent.change(getByTestId(/input/i), {
      target: { value: 'template nam' }
    });
    getByText(/template name/i);
    fireEvent.change(getByTestId(/input/i), {
      target: { value: 'template namr' }
    });
    getByText(/no templates found/i);
  });

  test('successful delete query', async () => {
    mockAxios.delete.mockResolvedValue({ data: { template: t1 } });
    const { getByTestId, getByText } = wrapper(reducer, <TestManage />);

    fireEvent.click(getByTestId(/template-delete/i));

    await wait(() => expect(mockAxios.delete).toHaveBeenCalledTimes(1));

    getByText(/no templates found/i);
  });

  test('failed delete query', async () => {
    mockAxios.delete.mockRejectedValue({
      response: { data: { error: 'foobar' } }
    });

    const { getByText, getByTestId } = wrapper(reducer, <TestManage />);

    fireEvent.click(getByTestId(/template-delete/i));

    await wait(() => getByText(/foobar/i));
  });

  test('generates template', () => {
    const { container, getByText, getByPlaceholderText } = wrapper(
      reducer,
      <>
        <WorkoutModal modal={true} closeModal={jest.fn()} />
        <TestManage />
      </>
    );

    fireEvent.click(getByText(/template name/i));

    fireEvent.click(getByText(/generate/i));

    expect(
      getByPlaceholderText(/Click to enter a title.../i).getAttribute('value')
    ).toBe(t1.title);

    getByText(/tag content/i);

    expect(container.innerHTML).toMatch(t1.notes);

    getByText(/Exercise2/i);
    getByText(/2 reps/i);
    getByText(/2 sets/i);
    getByText(/200 lbs/i);
  });
});

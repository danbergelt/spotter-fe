import React from 'react';
import { FROM_TEMPLATE } from '../../../../actions/workoutActions';
import WorkoutModal from '../../../../components/dash/workoutmodal/WorkoutModal';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import mockTemplateRes from '../../../../__testUtils__/mockTemplateRes';
import wrapper from '../../../../__testUtils__/wrapper';
import Modal from 'react-modal';
import { reducer } from '../../../../reducers/index';

describe('exercise actions', () => {
  afterEach(() => {
    cleanup;
    jest.clearAllMocks();
  });

  Modal.setAppElement(document.createElement('div'));

  it('can delete exercise', () => {
    const { getAllByTestId, queryByText, getByText, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    store.dispatch({
      type: FROM_TEMPLATE,
      payload: mockTemplateRes.data.templates[0]
    });

    expect(getByText(/exercise2/i)).toBeTruthy();

    fireEvent.click(getAllByTestId(/del-ex/i)[1]);

    expect(queryByText(/exercise2/i)).toBeFalsy();
  });

  it('loads exercise to edit into form', () => {
    const { getByPlaceholderText, getAllByText, store } = wrapper(
      reducer,
      <WorkoutModal modal={true} />
    );

    store.dispatch({
      type: FROM_TEMPLATE,
      payload: mockTemplateRes.data.templates[0]
    });

    fireEvent.click(getAllByText(/edit/i)[1]);

    expect(getByPlaceholderText('e.g. squat').value).toEqual('Exercise');
    expect(getByPlaceholderText('lbs').value).toEqual('100');
    expect(getByPlaceholderText('# of sets').value).toEqual('1');
    expect(getByPlaceholderText('# of reps').value).toEqual('1');
  });

  it('can edit exercise', async () => {
    const {
      getByPlaceholderText,
      getAllByText,
      store,
      queryByText,
      getByTestId
    } = wrapper(reducer, <WorkoutModal modal={true} />);

    store.dispatch({
      type: FROM_TEMPLATE,
      payload: mockTemplateRes.data.templates[0]
    });

    const a = getByPlaceholderText('e.g. squat');
    const b = getByPlaceholderText('lbs');
    const c = getByPlaceholderText('# of sets');
    const d = getByPlaceholderText('# of reps');

    fireEvent.click(getAllByText(/edit/i)[1]);

    fireEvent.change(a, { target: { value: 'edited' } });
    fireEvent.change(b, { target: { value: 999 } });
    fireEvent.change(c, { target: { value: 999 } });
    fireEvent.change(d, { target: { value: 999 } });

    fireEvent.click(getByTestId(/submit-exercise/i));

    await wait(() => {
      expect(queryByText('edited')).toBeTruthy();
      expect(queryByText('999 lbs')).toBeTruthy();
      expect(queryByText('999 sets')).toBeTruthy();
      expect(queryByText('999 reps')).toBeTruthy();
    });
  });

  it('clears input on trash and clear button click, also resets context', () => {
    const {
      getByPlaceholderText,
      getAllByText,
      store,
      getByText,
      getByTestId
    } = wrapper(reducer, <WorkoutModal modal={true} />);

    store.dispatch({
      type: FROM_TEMPLATE,
      payload: mockTemplateRes.data.templates[0]
    });

    fireEvent.click(getAllByText(/edit/i)[1]);

    expect(getByPlaceholderText('e.g. squat').value).toEqual('Exercise');
    expect(getByPlaceholderText('lbs').value).toEqual('100');
    expect(getByPlaceholderText('# of sets').value).toEqual('1');
    expect(getByPlaceholderText('# of reps').value).toEqual('1');

    fireEvent.click(getByText(/clear/i));

    expect(getByPlaceholderText('e.g. squat').value).toEqual('');
    expect(getByPlaceholderText('lbs').value).toEqual('');
    expect(getByPlaceholderText('# of sets').value).toEqual('');
    expect(getByPlaceholderText('# of reps').value).toEqual('');

    fireEvent.click(getAllByText(/edit/i)[1]);

    expect(getByPlaceholderText('e.g. squat').value).toEqual('Exercise');
    expect(getByPlaceholderText('lbs').value).toEqual('100');
    expect(getByPlaceholderText('# of sets').value).toEqual('1');
    expect(getByPlaceholderText('# of reps').value).toEqual('1');

    fireEvent.click(getByTestId(/trash-exercise/i));

    expect(getByPlaceholderText('e.g. squat').value).toEqual('');
    expect(getByPlaceholderText('lbs').value).toEqual('');
    expect(getByPlaceholderText('# of sets').value).toEqual('');
    expect(getByPlaceholderText('# of reps').value).toEqual('');

    // context changes back to add

    const a = getByPlaceholderText('e.g. squat');
    const b = getByPlaceholderText('lbs');
    const c = getByPlaceholderText('# of sets');
    const d = getByPlaceholderText('# of reps');

    fireEvent.change(a, { target: { value: 'edited' } });
    fireEvent.change(b, { target: { value: 999 } });
    fireEvent.change(c, { target: { value: 999 } });
    fireEvent.change(d, { target: { value: 999 } });

    fireEvent.click(getByTestId(/submit-exercise/i));

    expect(getAllByText(/edit/i).length).toEqual(3);
  });
});

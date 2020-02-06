import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  SET_CONFIRM_DELETE,
  setConfirmDeleteAction,
  SET_EXERCISES,
  setExercisesModalAction,
  SET_FROM_TEMPLATE,
  setFromTemplateModalAction,
  SET_TEMPLATES,
  fetchTemplatesAction,
  DELETE_TEMPLATE,
  deleteTemplateAction,
  setSaveTemplateModalAction,
  SET_TEMPLATE_SAVE
} from '../../../actions/optionsActions';

const mockStore = configureMockStore([thunk]);

describe('dispatches option actions', () => {
  test('set confirm delete modal state', () => {
    const expectedActions = [{ type: SET_CONFIRM_DELETE, payload: false }];

    const store = mockStore();

    store.dispatch(setConfirmDeleteAction(false));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set exercises modal state', () => {
    const expectedActions = [{ type: SET_EXERCISES, payload: true }];

    const store = mockStore();

    store.dispatch(setExercisesModalAction(true));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('set from template modal state', () => {
    const expectedActions = [{ type: SET_FROM_TEMPLATE, payload: true }];

    const store = mockStore();

    store.dispatch(setFromTemplateModalAction(true));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetches templates', async () => {
    axios.get.mockResolvedValue({ data: { templates: [{ name: 'foo' }] } });
    const expectedActions = [
      { type: SET_TEMPLATES, payload: [{ name: 'foo' }] }
    ];

    const store = mockStore();

    await store.dispatch(fetchTemplatesAction('token'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('deletes template', async () => {
    axios.delete.mockResolvedValue({});
    const expectedActions = [{ type: DELETE_TEMPLATE, payload: 2 }];

    const store = mockStore();

    await store.dispatch(deleteTemplateAction('token', 2));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('save template modal state', async () => {
    const expectedActions = [{ type: SET_TEMPLATE_SAVE, payload: false }];

    const store = mockStore();

    await store.dispatch(setSaveTemplateModalAction(false));

    expect(store.getActions()).toEqual(expectedActions);
  });
});

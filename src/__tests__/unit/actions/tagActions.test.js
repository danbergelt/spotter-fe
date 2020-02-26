import {
  fetchTags,
  FETCH_TAGS_START,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_ERROR,
  setActiveTabAction,
  closeTagModalAction,
  openTagModalAction,
  editTagAction
} from '../../../actions/tagsActions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import mockTagRes from '../../../__testUtils__/mockTagRes';
import { createMemoryHistory } from 'history';
import {
  SET_ACTIVE,
  CLOSE_TAG_MODAL,
  OPEN_TAG_MODAL
} from 'src/actions/optionsActions';
import { UPDATE_TAG } from 'src/actions/workoutActions';

const mockStore = configureMockStore([thunk]);

describe('tag actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('can fetch tags', async () => {
    axios.get.mockResolvedValue(mockTagRes);

    const expectedActions = [
      { type: FETCH_TAGS_START },
      { type: FETCH_TAGS_SUCCESS, payload: mockTagRes.data.tags }
    ];

    const store = mockStore({ tags: {} });

    const history = createMemoryHistory();

    await store.dispatch(fetchTags(history, 'token'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('proper rejection', async () => {
    const history = createMemoryHistory();

    const err = {
      response: {
        data: {
          error: 'TEST Error'
        }
      }
    };

    axios.get.mockRejectedValue(err);

    const expectedActions = [
      { type: FETCH_TAGS_START },
      { type: FETCH_TAGS_ERROR, payload: err.response.data.error }
    ];

    const store = mockStore({ err: null });

    await store.dispatch(fetchTags(history, 'token'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('delete tag', () => {
    const expectedActions = [{ type: SET_ACTIVE, payload: 1 }];

    const store = mockStore();

    store.dispatch(setActiveTabAction(1));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('close tag modal', () => {
    const expectedActions = [{ type: CLOSE_TAG_MODAL }];

    const store = mockStore();

    store.dispatch(closeTagModalAction());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('open tag modal', () => {
    const expectedActions = [{ type: OPEN_TAG_MODAL }];

    const store = mockStore();

    store.dispatch(openTagModalAction());

    expect(store.getActions()).toEqual(expectedActions);
  });
});

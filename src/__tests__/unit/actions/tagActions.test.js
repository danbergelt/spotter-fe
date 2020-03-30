import {
  fetchTagsAction,
  createTagAction,
  setActiveTabAction,
  deleteTagAction,
  editTagAction,
  closeTagModalAction,
  openTagModalAction
} from '../../../actions/tagsActions';
import configureMockStore from 'redux-mock-store';
import {
  ADD_TAGS,
  CREATE_TAG,
  SET_ACTIVE,
  CLOSE_TAG_MODAL,
  UPDATE_TAG,
  DELETE_TAG,
  OPEN_TAG_MODAL
} from 'src/constants/index';

const mockStore = configureMockStore();

describe('tag actions', () => {
  test('can delete tag', () => {
    const expectedActions = [{ type: DELETE_TAG, payload: { foo: 'bar' } }];

    const store = mockStore({ tags: {} });

    store.dispatch(deleteTagAction({ foo: 'bar' }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('can edit tag', () => {
    const expectedActions = [{ type: UPDATE_TAG, payload: 'foo' }];

    const store = mockStore({ tags: {} });

    store.dispatch(editTagAction('foo'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('can add fetched tags', () => {
    const expectedActions = [{ type: ADD_TAGS, payload: [{ foo: 'bar' }] }];

    const store = mockStore({ tags: {} });

    store.dispatch(fetchTagsAction([{ foo: 'bar' }]));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('can create a tag', () => {
    const expectedActions = [{ type: CREATE_TAG, payload: { foo: 'bar' } }];

    const store = mockStore({ tags: {} });

    store.dispatch(createTagAction({ foo: 'bar' }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  // test('proper rejection', async () => {
  //   const history = createMemoryHistory();

  //   const err = {
  //     response: {
  //       data: {
  //         error: 'TEST Error'
  //       }
  //     }
  //   };

  //   axios.get.mockRejectedValue(err);

  //   const expectedActions = [
  //     { type: FETCH_TAGS_START },
  //     { type: FETCH_TAGS_ERROR, payload: err.response.data.error }
  //   ];

  //   const store = mockStore({ err: null });

  //   await store.dispatch(fetchTags(history, 'token'));

  //   expect(store.getActions()).toEqual(expectedActions);
  // });

  test('set active tab', () => {
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

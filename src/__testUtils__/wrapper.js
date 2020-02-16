import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';

const wrapper = (
  reducer,
  component,
  { store = createStore(reducer, applyMiddleware(thunk)) } = {}
) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <HelmetProvider>
        <Provider store={store}>
          <Router history={history}>{component}</Router>
        </Provider>
      </HelmetProvider>
    ),
    store,
    history,
    container: document.body
  };
};

export default wrapper;

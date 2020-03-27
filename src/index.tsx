import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { createStore } from 'redux';
import { reducer } from './reducers';

/*== Root render func =====================================================

Root render function. Attaches to a dom node, and renders the SPA

Wrappers:
  React-Async-Helmet: 
    titles, favicons, SEO, etc. 
    https://github.com/staylor/react-helmet-async
  React-Redux:
    global state
    https://github.com/reduxjs/react-redux
  React-Router
    User routing, redirects, protected content
    https://github.com/ReactTraining/react-router
*/

const store = createStore(reducer);

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </HelmetProvider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { HelmetProvider } from 'react-helmet-async';

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

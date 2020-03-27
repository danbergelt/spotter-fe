import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Routes from './routes';
import Popup from './components/contact/Popup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useApi from './hooks/useApi';
import { refreshQuery } from './utils/queries';
import { addTokenAction } from './actions/globalActions';
import Spinner from './components/lib/Spinner';
import Flex from './components/lib/Flex';

/*== App =====================================================

This component sits in front of index.js, and is primarly designed
to handle refresh requests to the back end. Depending on the
response of that request, this component will either add a token,
(string | null) or push a user to /500 if there was a problem

*/

const App: React.FC = () => {
  // loading state --> need to use this instead of API hook loading state because first-render state needs to be true
  const [loading, setLoading] = useState(true);

  // state dispatcher
  const dispatch = useDispatch();

  // history object
  const history = useHistory();

  // api utils
  const [res, call] = useApi();

  useEffect(() => {
    // if successful call, add the token and set loading to false
    if (res.data) {
      setLoading(false);
      dispatch(addTokenAction(res.data.token));
    }

    // if there was an error, push to 500 page
    // TODO --> think of more graceful way to handle this. maybe special error component that drops from top?
    if (res.error) {
      setLoading(false);
      history.push('/500');
    }
  }, [res, dispatch, history]);

  // call the API to refresh the user's authentication
  useEffect(() => {
    call(refreshQuery);
  }, [call]);

  // if loading refresh query, render a spinner
  if (loading) {
    return (
      <div className={styles.spinner}>
        <Spinner size={100} color='#E9503F' />
      </div>
    );
  }

  return (
    <Flex fd='column' css={styles.container}>
      <Popup />
      <Routes />
    </Flex>
  );
};

export default App;

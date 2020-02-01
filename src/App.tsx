import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import Routes from './routes';
import Popup from './components/contact/Popup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ADD_TOKEN } from './actions/addTokenActions';

// this component renders in front of routes, checks for token, and returns proper authenticated data
// also requests refresh token on each refresh

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_T_API}/api/auth/refresh`, {
        withCredentials: true
      })
      .then(res => {
        dispatch<{ type: string; payload: string | null }>({
          type: ADD_TOKEN,
          payload: res.data.token
        });
        setLoading(false);
      })
      .catch(err => {
        history.push('/500');
        setLoading(false);
      });
  }, [dispatch, history]);

  if (loading) {
    return (
      <Loader
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        type='ThreeDots'
        color='#E9503F'
        height={40}
        width={150}
      />
    );
  }

  return (
    <main className='app-container'>
      <Popup />
      <Routes />
    </main>
  );
};

export default App;

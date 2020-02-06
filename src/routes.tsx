import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import Prs from './pages/Prs';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import PublicRoute from './components/auth/PublicRoute';

// component contains routes and handles routing authenticated users to various parts of app

const Routes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <PublicRoute exact path='/' component={Home} />
        <PublicRoute exact path='/login' component={LogIn} />
        <PublicRoute exact path='/signup' component={SignUp} />
        <PublicRoute exact path='/forgotpassword' component={ForgotPassword} />
        <PublicRoute exact path='/-/:id' component={ForgotPassword} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/settings' component={Settings} />
        <PrivateRoute exact path='/prs' component={Prs} />
        <Route exact path='/500' component={ServerError} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
import AuthRoute from './components/auth/AuthRoute';
import ChangePassword from './pages/ChangePassword';

/*== Primary app router =====================================================

App router. Contains all routes for the site. If the page is for unauth'd users,
i.e. home, log in, sign up, etc. only unauth'd users can access. If
the page requires auth, only auth'd users can access. 500 page and 404 are globally
accessible

*/

const Routes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <AuthRoute exact path='/' component={Home} />
        <AuthRoute path='/login' component={LogIn} />
        <AuthRoute path='/signup' component={SignUp} />
        <AuthRoute path='/forgotpassword' component={ForgotPassword} />
        <AuthRoute path='/-/:id' component={ChangePassword} />
        <AuthRoute path='/dashboard' component={Dashboard} auth />
        <AuthRoute path='/settings' component={Settings} auth />
        <AuthRoute path='/prs' component={Prs} auth />
        <Route path='/500' component={ServerError} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';
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

// primary application router. uses a custom route component to push auth'd and unauth'd users to their allowed pages

const Routes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <AuthRoute exact path='/' component={Home} auth={false} />
        <AuthRoute path='/login' component={LogIn} auth={false} />
        <AuthRoute path='/signup' component={SignUp} auth={false} />
        <AuthRoute
          path='/forgotpassword'
          component={ForgotPassword}
          auth={false}
        />
        <AuthRoute path='/-/:id' component={ForgotPassword} auth={false} />
        <AuthRoute path='/dashboard' component={Dashboard} auth={true} />
        <AuthRoute path='/settings' component={Settings} auth={true} />
        <AuthRoute path='/prs' component={Prs} auth={true} />
        {/* both auth'd and unauth'd users can access the below routes */}
        <AuthRoute path='/500' component={ServerError} auth={null} />
        <AuthRoute path='/test' component={ChangePassword} auth={null} />
        <AuthRoute component={NotFound} auth={null} />
      </Switch>
    </Layout>
  );
};

export default Routes;

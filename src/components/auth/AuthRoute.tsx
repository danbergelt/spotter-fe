import React, { ReactNode } from 'react';
import { RouteProps, Redirect, Route as Router } from 'react-router-dom';
import useToken from 'src/hooks/useToken';

/*== Auth route =====================================================

Custom route that extends React Router's Route component. Adds
functionality that performs auth checking and automatic redirects.
Pushes users around site according to their auth status

Can also function like a default React Router Route by accepting null
in the auth prop

Rules:
  auth === null && universally accessible
  auth === true && logged-in users only
  auth === false && non logged-in users only

Props:
  component: React Component
    The component to push the user to
  auth: boolean | null
    Whether the route is protected agains auth'd users, 
    protected against unauth'd users, or open to all users
  
  Also accepts additional react router props such as "exact",
  whch are then spread into the component

*/

interface Props extends RouteProps {
  component: React.ComponentType<RouteProps>;
  auth: boolean | null;
}

const AuthRoute: React.FC<Props> = ({
  component: Component,
  auth,
  ...otherProps
}) => {
  const token = useToken();

  // redirect fallback action
  const redirect = (): string => {
    // if auth fails, push to login
    if (!token && auth) {
      return '/login';
    }
    // if auth'd, push to dashboard
    if (token && !auth) {
      return '/dashboard';
    }
    // total fallback --> push to 500 page (should not happen)
    return '/500';
  };

  return (
    <>
      <Router
        {...otherProps}
        render={(props): ReactNode => {
          if (auth === null || (token && auth) || (!token && !auth)) {
            return <Component {...props} />;
          }
          return <Redirect to={redirect()} />;
        }}
      />
    </>
  );
};

export default AuthRoute;

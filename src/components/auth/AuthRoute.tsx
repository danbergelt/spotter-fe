import React, { ReactNode } from 'react';
import { RouteProps, Redirect, Route as Router } from 'react-router-dom';
import useToken from 'src/hooks/useToken';

// custom route that includes authentication check
// pushes users around site according to their auth status

// auth === null && universally accessible
// auth === true && logged-in users only
// auth === false && non logged-in users only

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

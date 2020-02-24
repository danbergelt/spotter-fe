import React, { ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import useToken from '../../hooks/useToken';

// unauthenticated route component
// this component accepts a token, verifies the token's contents, and either routes the accepted user to dashboard
// or sends them to the unauthenticated page

interface Props extends RouteProps {
  // eslint-disable-next-line
  component: React.ComponentType<any>;
  exact?: boolean;
  path: string;
}

const PublicRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const token: string | null = useToken();

  return (
    <>
      <Route
        {...rest}
        render={(props): ReactNode => {
          if (token) {
            return <Redirect to='/dashboard' />;
          }
          return <Component {...props} />;
        }}
      />
    </>
  );
};

export default PublicRoute;

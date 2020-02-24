import React, { ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import useToken from '../../hooks/useToken';

// authenticated route component
// this component accepts a token, verifies the token's contents, and either accepts the user or redirects them to log in

interface Props extends RouteProps {
  // eslint-disable-next-line
  component: React.ComponentType<any>;
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({
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
            return <Component {...props} />;
          }
          return <Redirect to='/login' />;
        }}
      />
    </>
  );
};

export default PrivateRoute;

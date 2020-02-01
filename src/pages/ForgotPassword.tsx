import React from 'react';
import { useLocation } from 'react-router-dom';
import ForgotPasswordInstructions from 'src/components/auth/ForgotPassInstructions';
import ForgotAndChangePass from 'src/components/auth/ForgotAndChangePass';
import { Helmet } from 'react-helmet-async';

const ForgotPassword: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>Forgot Password | Spotter</title>
      </Helmet>
      {pathname === '/forgotpassword' ? (
        <ForgotPasswordInstructions />
      ) : (
        <ForgotAndChangePass />
      )}
    </>
  );
};

export default ForgotPassword;

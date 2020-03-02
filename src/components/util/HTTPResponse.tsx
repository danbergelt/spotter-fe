import React from 'react';

// displays an HTTP response, either an error or a success message

interface Props {
  error?: string | null;
  success?: string | null;
}

const HTTPResponse: React.FC<Props> = ({ error, success }) => {
  const response = (): JSX.Element | null => {
    if (error) {
      return <p>{error}</p>;
    }

    if (success) {
      return <p>{success}</p>;
    }

    return null;
  };

  return <>{response()}</>;
};

export default HTTPResponse;

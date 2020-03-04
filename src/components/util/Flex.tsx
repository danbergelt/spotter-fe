import React from 'react';

interface Props {
  sb?: boolean;
}

const Flex: React.FC<Props> = ({ children, sb }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: sb ? 'space-between' : undefined
      }}
    >
      {children}
    </div>
  );
};

export default Flex;

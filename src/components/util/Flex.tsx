import React from 'react';

/*== Flex wrapper =====================================================

WIP

Utility wrapper that adds flexbox styling to children. Useful for not
having to repeat common flex-based styling patterns

Props (WIP, plan on adding more props + collision handling as time goes on)
  sb: boolean
    space-between (renders content on opposite ends of container)
  ac: boolean
    align-items center (renders content horizontally centered)

*/

interface Props {
  sb?: boolean;
  ac?: boolean;
}

const Flex: React.FC<Props> = ({ children, sb, ac }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: sb ? 'space-between' : undefined,
        alignItems: ac ? 'center' : undefined
      }}
      data-testid='flex'
    >
      {children}
    </div>
  );
};

export default Flex;

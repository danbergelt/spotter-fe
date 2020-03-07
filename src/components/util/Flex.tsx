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
  cn: string
    custom class name
  click: function
    onClick function

*/

interface Props {
  sb?: boolean;
  ac?: boolean;
  css?: React.CSSProperties;
  cn?: string;
  click?: Function;
}

const Flex: React.FC<Props> = ({ children, sb, ac, css, cn, click }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: sb ? 'space-between' : undefined,
        alignItems: ac ? 'center' : undefined,
        ...css
      }}
      data-testid='flex'
      className={cn}
      onClick={(): void => click && click()}
    >
      {children}
    </div>
  );
};

export default Flex;

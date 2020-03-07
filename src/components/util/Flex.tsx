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
  justify?:
    | 'space-between'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'initial'
    | 'inherit';
  align?:
    | 'stretch'
    | 'center'
    | 'baseline'
    | 'flex-start'
    | 'flex-end'
    | 'initial'
    | 'inherit';
  css?: React.CSSProperties;
  cn?: string;
  click?: Function;
}

const Flex: React.FC<Props> = ({
  children,
  justify,
  align,
  cn,
  css,
  click
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: justify,
        alignItems: align,
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

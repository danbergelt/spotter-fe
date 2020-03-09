import React from 'react';

/*== Flex wrapper =====================================================

WIP

Utility wrapper that adds flexbox styling to children. Useful for not
having to repeat common flex-based styling patterns

Props (WIP, plan on adding more props + collision handling as time goes on)
  justify: string enum (see below):
    the justify content prop. if not passed, defaults to undefined
  align: string enum (see below):
    the align items prop. if not passed, defaults to undefined
  cn: string
    custom classname
  css: React CSS properties
    inline styles (useful if styles need to be controlled by javascript)
  click: function
    onclick function
  fd: string
    flex direction

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
  fd?: 'column' | 'column-reverse';
  css?: React.CSSProperties;
  cn?: string;
  click?: Function;
}

const Flex: React.FC<Props> = ({
  children,
  justify,
  align,
  fd,
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
        flexDirection: fd,
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

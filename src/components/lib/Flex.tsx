import React from 'react';
import { StyleSheet, css as aphrodite } from 'aphrodite';
import cx from 'classnames';

/*== Flex wrapper =====================================================

WIP

Utility wrapper that adds flexbox styling to children. Useful for not
having to repeat common flex-based styling patterns

Uses the CSS in JS library Aphrodite (https://www.npmjs.com/package/aphrodite)
to generate hashed classname of passed-in flex styles. Then combines
those props with any custom classnames using the classnames package
https://www.npmjs.com/package/classnames. This allows for less JS bloat and
easy-to-read markup when debugging in browser.

Props (WIP, plan on adding more props + collision handling as time goes on)
  justify: string enum (see below):
    the justify content prop. if not passed, defaults to undefined
  align: string enum (see below):
    the align items prop. if not passed, defaults to undefined
  css: string
    custom classname
  click: function
    onclick function
  fd: string
    flex direction
  testid: string
    data-testid

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
  fw?: 'wrap';
  css?: string;
  click?: Function;
  testid?: string;
}

const Flex: React.FC<Props> = ({
  children,
  justify,
  align,
  fd,
  fw,
  css,
  click,
  testid
}) => {
  const styles = StyleSheet.create({
    flex: {
      display: 'flex',
      justifyContent: justify,
      alignItems: align,
      flexWrap: fw,
      flexDirection: fd
    }
  });

  return (
    <div
      data-testid={testid ? testid : 'flex'}
      className={cx(aphrodite(styles.flex), css)}
      onClick={(): void => click && click()}
    >
      {children}
    </div>
  );
};

export default Flex;

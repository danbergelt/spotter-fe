/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const Box: React.FC = props => {
  const { shadows, mq } = useTheme();

  return (
    <section
      css={{
        margin: '10rem auto',
        padding: '6rem 12rem',
        boxShadow: shadows.box,
        [mq.md]: {
          padding: '4rem 6rem'
        },
        [mq.sm]: {
          width: '32rem'
        }
      }}
      {...props}
    >
      {props.children}
    </section>
  );
};

export default Box;

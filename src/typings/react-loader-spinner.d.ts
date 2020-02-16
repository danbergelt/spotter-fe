declare module 'react-loader-spinner' {
  import { FC } from 'react';

  type Types =
    | 'Audio'
    | 'BallTriangle'
    | 'Bars'
    | 'Circles'
    | 'Grid'
    | 'Hearts'
    | 'Oval'
    | 'Puff'
    | 'Rings'
    | 'TailSpin'
    | 'ThreeDots'
    | 'Watch'
    | 'RevolvingDot'
    | 'Triangle'
    | 'Plane'
    | 'MutatingDots'
    | 'None'
    | 'NotSpecified';

  interface LoaderProps {
    // eslint-disable-next-line
    style?: any;
    type?: Types;
    color?: string;
    timeout?: number; // in milliseconds
    height?: number;
    width?: number;
    visible?: boolean | string;
  }

  declare const Loader: FC<LoaderProps>;
  export default Loader;
}

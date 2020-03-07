import React from 'react';
import styles from './Spinner.module.scss';

/*== Spinner =====================================================

A spinner to load during any loading states.
Spinner sourced from https://nounproject.com

WIP: replace all React loader spinners with this.

Props:
  size: number
    the size of the spinner in px;
  color: string
    an optional prop that determines color. otherwise, defaults to white

*/

interface Props {
  size: number;
  color?: string;
}

const Spinner: React.FC<Props> = ({ size, color }) => {
  return (
    <svg
      className={styles.spinner}
      height={`${size}px`}
      width={`${size}px`}
      fill={color ? color : 'white'}
      version='1.1'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
    >
      <g>
        <rect
          x='75.5769196'
          y='49.2689629'
          width='21.9230766'
          height='1.4616277'
        ></rect>
        <rect
          x='70.6817474'
          y='30.6343441'
          transform='matrix(0.866026 -0.499999 0.499999 0.866026 -4.9271727 45.0725899)'
          width='21.9229298'
          height='2.1924059'
        ></rect>
        <rect
          x='57.3076706'
          y='16.8950348'
          transform='matrix(0.4999954 -0.8660281 0.8660281 0.4999954 18.2375336 68.3014908)'
          width='21.9231224'
          height='2.9232821'
        ></rect>
        <rect
          x='48.1730766'
          y='2.5'
          width='3.6538463'
          height='21.9230766'
        ></rect>
        <rect
          x='29.5383625'
          y='7.3951139'
          transform='matrix(0.866026 -0.499999 0.499999 0.866026 -4.9272208 18.3246689)'
          width='4.3848119'
          height='21.9231224'
        ></rect>
        <rect
          x='15.7991362'
          y='20.7693043'
          transform='matrix(0.499999 -0.866026 0.866026 0.499999 -18.3012581 31.7628727)'
          width='5.1153016'
          height='21.9229298'
        ></rect>
        <rect
          x='2.5'
          y='47.0767441'
          width='21.9230766'
          height='5.8460646'
        ></rect>
        <rect
          x='7.3951139'
          y='64.9807587'
          transform='matrix(0.866026 -0.499999 0.499999 0.866026 -31.6752262 18.3246193)'
          width='21.9231224'
          height='6.5769429'
        ></rect>
        <rect
          x='20.769207'
          y='77.9894409'
          transform='matrix(0.5000254 -0.8660107 0.8660107 0.5000254 -54.8392258 68.2986679)'
          width='21.9231224'
          height='7.3073215'
        ></rect>
        <rect
          x='45.9808578'
          y='75.5769196'
          width='8.0382833'
          height='21.9230766'
        ></rect>
        <rect
          x='63.8848038'
          y='70.6815414'
          transform='matrix(0.866026 -0.499999 0.499999 0.866026 -31.6751633 45.0725975)'
          width='8.7688513'
          height='21.9231224'
        ></rect>
        <rect
          x='76.893158'
          y='57.307766'
          transform='matrix(0.5000077 -0.8660209 0.8660209 0.5000077 -18.301609 104.8388138)'
          width='9.5001135'
          height='21.9229298'
        ></rect>
      </g>
    </svg>
  );
};

export default Spinner;

import React from 'react';
import styles from './Label.module.scss';

/*== Form label =====================================================

Label to accompany form inputs

Props:
  content: string
    label text content
  input: string
    accompany input name to pair with label

*/

interface Props {
  content: string;
  input: string;
  css?: React.CSSProperties;
}

const Label: React.FC<Props> = ({ content, input, css }) => {
  return (
    <label style={{ ...css }} className={styles.label} htmlFor={input}>
      {content}
    </label>
  );
};

export default Label;

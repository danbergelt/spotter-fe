import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AltLink.module.scss';

/*== AltLink =====================================================

Used as an alternative link below a larger CTA.
Smaller font size, with subtle styling.

Example:
  Below Sign Up button: "Already signed up? Log in here"

Props:
  content: string
    the context of the alt link
  path: string
    the path to push the user to on link click
  linkContent: string
    the content of the link itself

*/

interface Props {
  content: string;
  path: string;
  linkContent: string;
}

const AltLink: React.FC<Props> = ({ content, path, linkContent }) => {
  return (
    <div className={styles.container}>
      <div>{content}</div>
      <Link className={styles.link} to={path}>
        {linkContent}
      </Link>
    </div>
  );
};

export default AltLink;

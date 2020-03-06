import React from 'react';
import styles from './Tip.module.scss';

/*== Tip =====================================================

A lightweight, reusable tooltip component that adds context to
a UI element on hover.

Fixed width of 120px, so keep content short and sweet. Serves
to add an extra word or two when necessary. Can be positioned
to the top, right, bottom, or left of trigger element

Trigger element can be a string, or a React component

Props
  trigger: string | React Component
    the markup or text that triggers the tip render
  content: string
    the tip content
  place: string
    the position of the tip. must be top, right, bottom, or left

*/

interface Props {
  trigger: string | React.ComponentType;
  content: string;
  place: 'top' | 'right' | 'bottom' | 'left';
}

const Tip: React.FC<Props> = ({ trigger, content, place }) => {
  const renderTrigger = (): string | JSX.Element => {
    // if trigger is a string, return that string
    if (typeof trigger === 'string') {
      return trigger;
      // if trigger is JSX, render it as a component
    } else {
      const Trigger = trigger;
      return <Trigger />;
    }
  };

  return (
    <div className={styles.container}>
      {renderTrigger()}
      <div className={`${styles.tip} ${styles[place]}`}>{content}</div>
    </div>
  );
};

export default Tip;

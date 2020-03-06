import React from 'react';
import styles from './Tip.module.scss';

interface Props {
  trigger: string | React.ComponentType;
  content: string;
  place: 'top' | 'right' | 'bottom' | 'left';
}

const Tip: React.FC<Props> = ({ trigger, content, place }) => {
  const renderTrigger = (): string | JSX.Element => {
    if (typeof trigger === 'string') {
      return trigger;
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

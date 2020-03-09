import React from 'react';
import { FiEdit3, FiTarget, FiCalendar } from 'react-icons/fi';
import styles from './TextBlocks.module.scss';
import Flex from '../lib/Flex';
import { useWindowSize } from 'react-use';
import { IconType } from 'react-icons/lib/cjs';

const STROKE_WIDTH = '1.25px';

interface Props {
  icon: IconType;
  id: string;
  title: string;
  content: [string, string, string];
}

const TextBlock: React.FC<Props> = ({ icon: Icon, id, title, content }) => {
  return (
    <div className={styles.block}>
      <div className={`${styles.icon} ${styles[id]}`}>
        <Icon strokeWidth={STROKE_WIDTH} />
      </div>
      <p className={styles.blockTitle}>{title}</p>
      <p className={styles.content}>
        {content[0]}
        <span className={styles.highlight}>{content[1]}</span> {content[2]}
      </p>
    </div>
  );
};

export const TextBlocks: React.FC = () => {
  const { width } = useWindowSize();

  return (
    <Flex align='center' fd='column' cn={styles.container}>
      <h2 className={styles.title}>
        Spotter is a lifting-focused fitness pal that helps you...
      </h2>
      <Flex
        fd={width <= 800 ? 'column' : undefined}
        align={width <= 800 ? 'center' : undefined}
        justify='space-between'
        cn={styles.blocks}
      >
        <TextBlock
          icon={FiEdit3}
          id='track'
          title='Track your lifts'
          content={[
            'Our dashboard ',
            'automates your fitiness journey',
            ' and makes tracking your lifts fun and easy.'
          ]}
        />
        <TextBlock
          icon={FiTarget}
          id='bests'
          title='Log your personal bests'
          content={[
            "Save the exercises you want tracked, and we'll ",
            'calculate your PRs automatically.',
            ''
          ]}
        />
        <TextBlock
          id='scale'
          icon={FiCalendar}
          title='Stay organized'
          content={[
            'Spreadsheets are unwieldy. ',
            'Access, view, and edit',
            ' any of your workouts with ease.'
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default TextBlocks;

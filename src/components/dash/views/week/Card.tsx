import React from 'react';
import { FiAlignLeft } from 'react-icons/fi';
import { Workout } from 'src/types';
import { useWindowSize } from 'react-use';
import styles from './Card.module.scss';
import Flex from 'src/components/lib/Flex';

/*== WorkoutCard =====================================================

The workout representation that renders in the weekly view. Includes 
title, tags, and an icon if the workout has content (either notes or exercises).
The rest of the data can be accessed via the workout modal --> open
by clicking on the card.

Content gets sliced as viewport gets smaller.

Props:
  workout: Workout
    the workout to render as ac ard

*/

interface Props {
  workout: Workout;
}

const Card: React.FC<Props> = ({ workout }) => {
  // used to slice content as window size changes
  const { width } = useWindowSize();

  // slice the workout title when viewport is mobile
  const formatTitle = (title: string): string => {
    if (width <= 500 && title.length > 3) {
      return `${title.slice(0, 3)}...`;
    }
    return title;
  };

  // slice the tag content when viewport is tablet size and lower
  const formatTag = (content: string): string => {
    if (width <= 750 && content.length > 2) {
      return `${content.slice(0, 2).toUpperCase()}...`;
    }
    return content.toUpperCase();
  };

  // if the workout has notes or exercises, render a 'hasContent' icon
  const hasContent = (): JSX.Element | undefined => {
    if (workout.notes || workout.exercises.length) {
      return (
        <FiAlignLeft data-testid='content' className={styles.hasContent} />
      );
    }
    return;
  };

  return (
    <>
      <p data-testid='workout-title' className={styles.title}>
        {formatTitle(workout.title)}
      </p>
      {hasContent()}
      <Flex fw='wrap' css={styles.container}>
        {workout.tags.map(tag => (
          <p
            className={styles.tag}
            key={tag._id}
            style={{ background: tag.color }}
          >
            {formatTag(tag.content)}
          </p>
        ))}
      </Flex>
    </>
  );
};

export default Card;

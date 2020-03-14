import React from 'react';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import { useSelector } from 'react-redux';
import { State } from 'src/types/State';
import styles from './Tags.module.scss';
import Flex from 'src/components/lib/Flex';

const Tags: React.FC = () => {
  const tags: Array<TagOnWorkout> = useSelector(
    (state: State) => state.workoutReducer.tags
  );

  const renderTags = (): JSX.Element | JSX.Element[] => {
    if (tags.length) {
      return tags.map(tag => (
        <div
          key={tag._id}
          data-testid='tag'
          className={styles.tag}
          style={{ background: tag.color }}
        >
          {tag.content.toUpperCase()}
        </div>
      ));
    }
    return <p className={styles.empty}>No tags</p>;
  };

  return (
    <Flex fd='column' css={styles.container}>
      <h1 className={styles.head}>TAGS</h1>
      <Flex fw='wrap'>{renderTags()}</Flex>
    </Flex>
  );
};

export default Tags;

import React from 'react';
import { Tag } from 'src/types';
import { useSelector } from 'react-redux';
import { State } from 'src/types';
import styles from './Tags.module.scss';
import Flex from 'src/components/lib/Flex';

/*== Tags =====================================================

A workout's tags, mapped into the modal below the title. If no
tags exist for this workout, then "no tags" placeholder is
rendered. Otherwise, map the tag's into a small button-like
component with the content capitalized.

TO-DO --> make it so that a user can toggle a tag just by clicking
on it instead of having to operate through the tags menu tab,
which is unintuitive

*/

const Tags: React.FC = () => {
  // this workout's tags
  const tags: Array<Tag> = useSelector(
    (state: State) => state.workoutReducer.tags
  );

  // a function that maps tags into an array of <div>'s
  const renderTags = (): JSX.Element | JSX.Element[] => {
    // if tags exist, map into the component
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
    // otherwise return a placeholder
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

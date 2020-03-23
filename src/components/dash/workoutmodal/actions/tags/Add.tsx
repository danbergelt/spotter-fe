import React from 'react';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTagAction } from 'src/actions/workoutActions';
import { Action } from 'redux';
import styles from './Add.module.scss';
import { FiCheck } from 'react-icons/fi';
import { State } from 'src/types/State';
import { HS } from 'src/types/Types';

/*== Add tags =====================================================

This component allows a user to add and remove tags from the current
workout. If there are no tags, a placeholder message is displayed

Props:
  tags: Array<Tags>
    all of a user's tags
  hs: HS
    the hover state managed by the parent. since colors for each
    tag are fetched and thus are stuck in JS, need to set hover
    functionality using pointer events. the parent owns this logic
    so as to give all children access to the hover logic

*/

interface Props {
  tags: Array<TagOnWorkout>;
  hs: HS;
}

const Add: React.FC<Props> = ({ hs, tags }) => {
  // state dispatcher
  const dispatch = useDispatch();

  // current workout
  const workout = useSelector((state: State) => state.workoutReducer);

  // if no tags, render a placeholder
  if (!tags.length) {
    return <p className={styles.empty}>No tags found</p>;
  }

  return (
    <>
      {tags.map(tag => (
        <div
          className={styles.tag}
          onClick={(): Action => dispatch(toggleTagAction(tag))}
          onPointerEnter={(): void => hs.setHovered(tag._id)}
          onPointerLeave={(): void => hs.setHovered('')}
          key={tag._id}
          // compare hovered tag and mapped tag. if they match, return a darkened color
          style={{ background: hs.darken([hs.hovered, tag._id], tag.color) }}
        >
          {tag.content}
          {workout.tags.map(
            // if current workout has tag, render a checkmark
            workoutTag =>
              workoutTag._id === tag._id && (
                <FiCheck key={tag._id} className={styles.check} />
              )
          )}
        </div>
      ))}
    </>
  );
};

export default Add;

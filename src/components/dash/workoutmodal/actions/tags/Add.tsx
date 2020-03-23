import React, { useState } from 'react';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTagAction } from 'src/actions/workoutActions';
import { Action } from 'redux';
import styles from './Add.module.scss';
import adjust from 'src/utils/darkenColorInJS';
import { FiCheck } from 'react-icons/fi';
import { State } from 'src/types/State';

interface Props {
  tags: Array<TagOnWorkout>;
}

const Add: React.FC<Props> = ({ tags }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState('');
  const workout = useSelector((state: State) => state.workoutReducer);

  if (!tags.length) {
    return <p className={styles.empty}>No tags found</p>;
  }

  return (
    <>
      {tags.map(tag => (
        <div
          className={styles.tag}
          onClick={(): Action => dispatch(toggleTagAction(tag))}
          onPointerEnter={(): void => setHover(tag._id)}
          onPointerLeave={(): void => setHover('')}
          key={tag._id}
          style={{
            background: tag._id === hover ? adjust(tag.color, -40) : tag.color
          }}
        >
          {tag.content}
          {workout.tags.map(
            workoutTag =>
              workoutTag._id === tag._id && <FiCheck className={styles.check} />
          )}
        </div>
      ))}
    </>
  );
};

export default Add;

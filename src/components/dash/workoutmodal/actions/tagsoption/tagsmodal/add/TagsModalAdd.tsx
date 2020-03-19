import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTagAction } from '../../../../../../../actions/workoutActions';
import Tag from './Tag';
import { State } from 'src/types/State';
import { TagOnWorkout as T } from 'src/types/TagOnWorkout';

interface Props {
  loading: boolean;
}

// tab - add tag to current workout
const TagsModalAdd: React.FC<Props> = ({ loading }) => {
  const tags: Array<T> = useSelector((state: State) => state.tagsReducer.tags);
  const onWorkout: Array<T> = useSelector(
    (state: State) => state.workoutReducer.tags
  );

  const dispatch = useDispatch();

  const [hover, setHover] = useState<null | string>(null);

  const toggleTag: (tag: T) => void = useCallback(
    tag => {
      dispatch(toggleTagAction(tag));
    },
    [dispatch]
  );

  if (!tags.length) {
    return <div className='no-tags-found'>No tags found</div>;
  }

  return (
    <>
      <p className='tag-add-head' data-testid='add-tag'>
        Add
      </p>
      {/* map list of created tags */}
      {tags.map(tag => (
        <Tag
          key={tag._id}
          toggleTag={toggleTag}
          onWorkout={onWorkout}
          tag={tag}
          hover={hover}
          setHover={setHover}
        />
      ))}
    </>
  );
};

export default TagsModalAdd;

import React from 'react';
import { tagStyles } from './tagstyles';
import { TagOnWorkout } from '../../../../../types/TagOnWorkout';

interface Props {
  tag: TagOnWorkout;
}

const Tag: React.FC<Props> = ({ tag }) => {
  return (
    <div data-testid='mapped-tag' style={tagStyles(tag.color)}>
      {tag.content.toUpperCase()}
    </div>
  );
};

export default Tag;

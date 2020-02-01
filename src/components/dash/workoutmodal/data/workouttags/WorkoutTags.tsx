import React from 'react';
import { useSelector } from 'react-redux';
import Tag from './Tag';
import { State } from 'src/types/State';
import { TagOnWorkout } from '../../../../../types/TagOnWorkout';

// tags on a workout
// display only, functionality sequestered to the tags modal

const WorkoutTags: React.FC = () => {
  const tags: Array<TagOnWorkout> = useSelector(
    (state: State) => state.workoutReducer.tags
  );

  return (
    <section className='workout-data-tags'>
      <h1 className='workout-data-tags-head'>TAGS</h1>
      <div className='workout-data-tags-container'>
        {!tags.length ? (
          <p
            className='workout-data-tags-head'
            style={{ fontSize: '1.2rem', margin: 0 }}
          >
            No tags
          </p>
        ) : (
          tags.map(tag => <Tag key={tag._id} tag={tag} />)
        )}
      </div>
    </section>
  );
};

export default WorkoutTags;

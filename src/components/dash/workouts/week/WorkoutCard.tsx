import React from 'react';
import { FiAlignLeft } from 'react-icons/fi';
import { Workout } from 'src/types/Workout';
import { useWindowSize } from 'react-use';

// card that renders under each column in weekly workout view
// data represents data for each workout

interface Props {
  workout: Workout;
}

const WorkoutCard: React.FC<Props> = ({ workout }) => {
  const { width } = useWindowSize();

  return (
    <>
      <p data-testid='workout-title' className='workout-card-title'>
        {width <= 500 && workout.title.length > 4
          ? `${workout.title.slice(0, 3)}...`
          : workout.title}
      </p>
      {workout.notes || workout.exercises.length ? (
        <FiAlignLeft className='workout-card-notes-ind' />
      ) : null}
      <section className='workout-card-tag-container'>
        {workout.tags.map(el => (
          <p
            className='workout-card-tag'
            key={el._id}
            style={{ background: el.color }}
          >
            {width <= 750 && el.content.length > 2
              ? `${el.content.slice(0, 2).toUpperCase()}...`
              : el.content.toUpperCase()}
          </p>
        ))}
      </section>
    </>
  );
};

export default WorkoutCard;

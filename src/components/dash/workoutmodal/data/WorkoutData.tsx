import React from 'react';

// sub-components
import WorkoutTags from './workouttags/WorkoutTags';
import WorkoutNotes from './workoutnotes/WorkoutNotes';
import WorkoutExercises from './exercises/WorkoutExercises';

const WorkoutData: React.FC = () => {
  return (
    <div className='workout-data'>
      <WorkoutTags />
      <WorkoutNotes />
      <WorkoutExercises />
    </div>
  );
};

export default WorkoutData;

import React, { memo } from 'react';
import { useSelector } from 'react-redux';

// components
import TagsOption from './options/tagsoption/TagsOption';
import SaveTemplateOption from './options/savetemplate/SaveTemplateOption';
import FromTemplateOption from './options/fromtemplate/FromTemplateOption';
import ExerciseOption from './options/exercises/ExerciseOption';
import DeleteWorkout from './options/deleteworkout/DeleteWorkout';
import SaveWorkout from './options/saveworkout/SaveWorkout';
import { State } from 'src/types/State';

interface Props {
  closeParentModal: () => void;
  time: number;
}

// container for sidebar menu on workout modal
const WorkoutOptions: React.FC<Props> = ({ closeParentModal, time }) => {
  const iconClass = 'add-workout-options-icon';

  const ctx: string | null = useSelector(
    (state: State) => state.globalReducer.ctx
  );

  const workoutId: string | null = useSelector(
    (state: State) => state.workoutReducer._id
  );

  return (
    <div className='add-workout-options-container'>
      <h1 className='add-workout-options-title sub'>ACTIONS</h1>
      <section className='add-workout-options-buttons'>
        <div className='options-left'>
          <TagsOption iconClass={iconClass} />
          <SaveTemplateOption iconClass={iconClass} />
          <FromTemplateOption iconClass={iconClass} />
          <ExerciseOption iconClass={iconClass} />
        </div>
        <div className='options-right'>
          <DeleteWorkout
            closeParentModal={closeParentModal}
            workoutId={workoutId}
            ctx={ctx}
            iconClass={iconClass}
          />
          <SaveWorkout
            closeParentModal={closeParentModal}
            workoutId={workoutId}
            ctx={ctx}
            iconClass={iconClass}
          />
        </div>
      </section>
    </div>
  );
};

export default memo(WorkoutOptions);

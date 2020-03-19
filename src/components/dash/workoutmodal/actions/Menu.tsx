import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styles from './Menu.module.scss';
import TagsOption from './tagsoption/TagsOption';
import SaveTemplateOption from './savetemplate/SaveTemplateOption';
import FromTemplateOption from './fromtemplate/FromTemplateOption';
import ExerciseOption from './exercises/ExerciseOption';
import DeleteWorkout from './deleteworkout/DeleteWorkout';
import SaveWorkout from './saveworkout/SaveWorkout';
import { State } from 'src/types/State';

/*== Menu =====================================================

Menu that appears in all workout modals (add or view).

Includes the below options:
  Save Workout
  Delete Workout
  Manage saved exercises
  Generate a workout from a template
  Save the current workout as a template
  Manage all tags

Props:
  closeParentModal: Function
    close the workout modal, triggers on certain actions

*/

interface Props {
  closeParentModal: () => void;
}

const Menu: React.FC<Props> = ({ closeParentModal }) => {
  // icon class shared across multiple menu buttons
  const iconClass = 'add-workout-options-icon';

  // the current workout's id, used in edit/delete queries
  const workoutId: string | null = useSelector(
    (state: State) => state.workoutReducer._id
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ACTIONS</h1>
      <section className={styles.buttons}>
        <div>
          <TagsOption iconClass={iconClass} />
          <SaveTemplateOption iconClass={iconClass} />
          <FromTemplateOption iconClass={iconClass} />
          <ExerciseOption iconClass={iconClass} />
        </div>
        <div>
          <DeleteWorkout
            closeParentModal={closeParentModal}
            workoutId={workoutId}
          />
          <SaveWorkout
            closeParentModal={closeParentModal}
            workoutId={workoutId}
          />
        </div>
      </section>
    </div>
  );
};

export default memo(Menu);

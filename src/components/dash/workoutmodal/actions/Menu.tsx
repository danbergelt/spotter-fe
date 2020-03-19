import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styles from './Menu.module.scss';
import TagsOption from './tagsoption/TagsOption';
import SaveTemplateOption from './savetemplate/SaveTemplateOption';
import FromTemplateOption from './fromtemplate/FromTemplateOption';
import Exercises from './exercises/Exercises';
import DeleteWorkout from './deleteworkout/DeleteWorkout';
import SaveWorkout from './saveworkout/SaveWorkout';
import { State } from 'src/types/State';
import { useWindowSize } from 'react-use';

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

  const { width } = useWindowSize();

  // dynamically set position according to viewport width
  const nudgeLeft = (): string | undefined => {
    // push to bottom left corner at tablet and below
    if (width <= 800) {
      return '20px';
    }

    // nudge left when viewport closes in on border
    if (width <= 875) {
      return '68vw';
    }

    return;
  };

  const nudgeBottom = (): string | undefined => {
    if (width <= 800) {
      return '40px';
    }

    return;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ACTIONS</h1>
      <section className={styles.buttons}>
        <div>
          <TagsOption iconClass={iconClass} />
          <SaveTemplateOption iconClass={iconClass} />
          <FromTemplateOption iconClass={iconClass} />
          <Exercises nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
        </div>
        <div>
          <DeleteWorkout
            nudgeLeft={nudgeLeft}
            nudgeBottom={nudgeBottom}
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

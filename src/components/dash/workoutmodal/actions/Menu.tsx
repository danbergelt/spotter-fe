import React, { memo } from 'react';
import styles from './Menu.module.scss';
import Exercises from './exercises/Exercises';
import DeleteWorkout from './deleteworkout/DeleteWorkout';
import SaveWorkout from './saveworkout/SaveWorkout';
import { useWindowSize } from 'react-use';
import Templates from './templates/Templates';
import Tags from './tags/Tags';
import { Ctx } from 'src/types/Types';

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
  closeModal: Function
    close the workout modal, triggers on certain actions

*/

interface Props {
  closeModal: () => void;
  ctx: Ctx;
}

const Menu: React.FC<Props> = ({ closeModal, ctx }) => {
  // width for dynamic resizing
  const { width } = useWindowSize();

  // dynamically set position according to viewport width
  const nudgeLeft = (): string | undefined => {
    // push to bottom left corner at tablet and below
    if (width <= 800) return '16px';

    // nudge left when viewport closes in on border
    if (width <= 875) return '68vw';

    // otherwise render default position
    return;
  };

  // dynamically set position according to viewport width
  const nudgeBottom = (): string | undefined => {
    // push to bottom left corner at tablet and below
    if (width <= 800) return '44px';

    // otherwise render default position
    return;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ACTIONS</h1>
      <section className={styles.buttons}>
        <div>
          <Tags nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
          <Templates nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
          <Exercises nudgeBottom={nudgeBottom} nudgeLeft={nudgeLeft} />
        </div>
        <div>
          <DeleteWorkout
            ctx={ctx}
            nudgeLeft={nudgeLeft}
            nudgeBottom={nudgeBottom}
            closeModal={closeModal}
          />
          <SaveWorkout ctx={ctx} closeModal={closeModal} />
        </div>
      </section>
    </div>
  );
};

export default memo(Menu);

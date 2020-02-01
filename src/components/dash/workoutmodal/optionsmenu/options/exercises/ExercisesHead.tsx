import React, { memo } from 'react';
import { FiX } from 'react-icons/fi';

// tabs to control exercises modal

interface Props {
  handleCloseExerciseModal: () => void;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

const ExercisesHead: React.FC<Props> = ({
  handleCloseExerciseModal,
  tab,
  setTab
}) => {
  return (
    <>
      <nav className='exercises-header'>
        <div
          style={{
            display: 'flex',
            width: '55%',
            justifyContent: 'space-between'
          }}
        >
          <div
            role='button'
            onClick={(): void => setTab(0)}
            className={
              tab === 0 ? 'exercises-title' : 'exercises-title-not-active'
            }
          >
            Manage
          </div>
          <div
            role='button'
            onClick={(): void => setTab(1)}
            className={
              tab === 1 ? 'exercises-title' : 'exercises-title-not-active'
            }
          >
            Create
          </div>
        </div>
        <div
          role='button'
          onClick={(): void => handleCloseExerciseModal()}
          className='exercises-exit'
        >
          <FiX
            // inline styles as a convenience
            data-testid='quit-exercises'
            style={{ display: 'flex', alignItems: 'center' }}
          />
        </div>
      </nav>
    </>
  );
};

export default memo(ExercisesHead);

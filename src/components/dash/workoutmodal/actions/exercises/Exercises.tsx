import React, { useState, useRef, useEffect } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import styles from './Exercises.module.scss';
import Dropdown from 'src/components/lib/Dropdown';
import Head from 'src/components/lib/Head';
import Flex from 'src/components/lib/Flex';
import useApi from 'src/hooks/useApi';
import { fetchExercisesQuery } from 'src/utils/queries';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'src/types/State';
import { fetchExercisesAction } from 'src/actions/fetchExercisesActions';
import Manage from './Manage';
import useToken from 'src/hooks/useToken';
import Create from './Create';
import Tabs from 'src/components/lib/Tabs';
import useTabs from 'src/hooks/useTabs';

/*== Exercises =====================================================

Exercises popup that allows a user to delete their saved exercises,
view all of their saved exercises, and add new saved exercises. Saved
exercises are what is tracked in the PR's (soon to be stats) page.

TODO --> separating this form from the PRs/stats page is unintuitive,
and has been a source of confusion. Look into moving this functionality to
the PR's page, so that users can add exercises to track and view tracked
exercises in one place instead of having to go back and forth. Also,
this functionality is not clear ('why does this exist') unless a user knows
about how the PR's are tracked.

Props:
  nudgeLeft: function
    dynamically nudge popup left on small viewports
  nudgeBottom: function
    dynamically nudge popup from bottom on small viewports

*/

interface Props {
  nudgeLeft: () => string | undefined;
  nudgeBottom: () => string | undefined;
}

const Exercises: React.FC<Props> = ({ nudgeLeft, nudgeBottom }) => {
  // tabs utility hook that sets initial state + allows parent to access state
  const tabState = useTabs('Manage');

  // current active tab
  const [active] = tabState;

  // trigger ref for popup
  const ref = useRef<HTMLDivElement>(null);

  // api utils
  const [res, call] = useApi();

  // auth token
  const token = useToken();

  // list of exercises loaded from state
  const exercises = useSelector(
    (state: State) => state.fetchExercisesReducer.savedExercises
  );

  // state dispatcher
  const dispatch = useDispatch();

  // popup state
  const [isOpen, setIsOpen] = useState(false);

  // if successful get request, pass exercises into app state
  useEffect(() => {
    if (res.data) {
      dispatch(fetchExercisesAction(res.data.exercises));
    }

    if (res.error) {
      // handle error later
    }
  }, [res, dispatch]);

  // tab controller
  const renderTab = (): JSX.Element => {
    if (active === 'Manage') {
      return <Manage exercises={exercises} />;
    }

    if (active === 'Create') {
      return <Create />;
    }

    // fallback (should not happen)
    return <div>An error occurred</div>;
  };

  // popup toggler. preempt opening the popup by calling and fetching exercises
  // makes for smooth open with all exercises preloaded
  const toggle = async (): Promise<void> => {
    if (!isOpen) {
      await call(fetchExercisesQuery, [token]);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        ref={ref}
        role='button'
        onClick={toggle}
        data-testid='exercises-modal'
        className={styles.button}
      >
        <FiTrendingUp className={styles.icon} /> Exercises
      </div>
      {isOpen && (
        <Dropdown
          bottom={nudgeBottom()}
          left={nudgeLeft()}
          css={styles.dropdown}
          setState={setIsOpen}
          refs={[ref]}
        >
          <Flex justify='space-between' align='center'>
            <Tabs resetOnUnmount state={tabState} tabs={['Manage', 'Create']} />
            <Head size={13} setState={setIsOpen} />
          </Flex>
          {renderTab()}
        </Dropdown>
      )}
    </>
  );
};

export default Exercises;

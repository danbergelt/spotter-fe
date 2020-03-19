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

interface Props {
  nudgeLeft: () => string | undefined;
  nudgeBottom: () => string | undefined;
}

const Exercises: React.FC<Props> = ({ nudgeLeft, nudgeBottom }) => {
  const manage = useRef(null);
  const create = useRef(null);
  const ref = useRef<HTMLDivElement>(null);

  const [res, call] = useApi();

  const token = useToken();

  const exercises = useSelector(
    (state: State) => state.fetchExercisesReducer.savedExercises
  );
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(manage);

  useEffect(() => {
    if (res.data) {
      dispatch(fetchExercisesAction(res.data.exercises));
    }

    if (res.error) {
      // handle error later
    }
  }, [res, dispatch]);

  useEffect(() => {
    if (!isOpen) {
      setActive(manage);
    }
  }, [isOpen, setActive]);

  const renderTab = (): JSX.Element => {
    if (active === manage) {
      return <Manage exercises={exercises} />;
    }

    if (active === create) {
      return <Create />;
    }

    return <div>An error occurred</div>;
  };

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
            <Flex>
              <p
                ref={manage}
                className={active === manage ? styles.active : styles.tab}
                onClick={(): void => setActive(manage)}
              >
                Manage
              </p>
              <p
                ref={create}
                className={active === create ? styles.active : styles.tab}
                onClick={(): void => setActive(create)}
              >
                Create
              </p>
            </Flex>
            <Head size={13} setState={setIsOpen} />
          </Flex>
          {renderTab()}
        </Dropdown>
      )}
    </>
  );
};

export default Exercises;

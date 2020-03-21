import React, { useEffect, useCallback } from 'react';
import Flex from './Flex';
import styles from './Tabs.module.scss';

/*== Tabs =====================================================

Tabs utility component. Creates a set of toggleable tabs to 
activate different states in a parent, and activate different
styles for each tab (active vs. inactive). Pairs with a useTabs
custom hook that controls the state externally so that the parent
can access it

Props:
  tabs: Array<string>
    the tab content to be mapped into individual tabs
  stats: tuple<useTabs>
    the useTabs state utils (active, setActive, initial)
  resetOnUnmount: boolean
    specifices if the tabs should be reset when the tabs
    unmount

*/

interface Props {
  tabs: Array<string>;
  state: [string, React.Dispatch<React.SetStateAction<string>>, string];
  resetOnUnmount?: boolean;
}

const Tabs: React.FC<Props> = ({ tabs, state, resetOnUnmount }) => {
  // useTabs state + initial state
  const [active, setActive, initial] = state;

  // since each tab's content is used as key + used to track state, each tab must be unique
  // run this effect on mount. if duplicate tab is detected, throw an error
  useEffect(() => {
    const unique = new Set(tabs);
    if (unique.size !== tabs.length) {
      throw new Error(
        'Duplicate tab detected. All tabs must be unique strings.'
      );
    }
  }, [tabs]);

  // if resetOnUnmount is true, reset the tab state
  const reset = useCallback(() => {
    if (resetOnUnmount) {
      setActive(initial);
    }
    // eslint-disable-next-line
  }, []);

  // run reset callback on unmount
  // TODO --> need to find a way to test the below behavior
  useEffect(() => {
    return (): void => reset();
  }, [reset]);

  return (
    <Flex>
      {tabs.map(tab => (
        <p
          className={active === tab ? styles.active : styles.tab}
          onClick={(): void => setActive(tab)}
          key={tab}
        >
          {tab}
        </p>
      ))}
    </Flex>
  );
};

export default Tabs;

import React, { useState, useRef, useEffect } from 'react';
import { FiTag } from 'react-icons/fi';
import styles from './Tags.module.scss';
import useApi from 'src/hooks/useApi';
import { fetchTagsQuery } from 'src/utils/queries';
import useToken from 'src/hooks/useToken';
import Dropdown from 'src/components/lib/Dropdown';
import Tabs from 'src/components/lib/Tabs';
import useTabs from 'src/hooks/useTabs';
import Flex from 'src/components/lib/Flex';
import Head from 'src/components/lib/Head';
import Add from './Add';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import Manage from './Manage';
import Create from './Create';
import adjust from 'src/utils/darkenColorInJS';

/*== Tags =====================================================

This is the parent component for the tags popup in the workout
modal. In here, a user can toggle a tag on the current workout,
edit a tag, delete a tag, and create a tag.

Props:
  nudgeBottom: function
    nudge the component from the bottom on tablet sizes and below
  nudgeLeft: function
    nudge the component from the left on tablet sizes and below 

*/

interface Props {
  nudgeBottom: () => string | undefined;
  nudgeLeft: () => string | undefined;
}

const Tags: React.FC<Props> = ({ nudgeBottom, nudgeLeft }) => {
  // dropdown state
  const [isOpen, setIsOpen] = useState(false);

  // fetched tags for this user
  const [tags, setTags] = useState([] as Array<TagOnWorkout>);

  // hover state for the tags (tags change color on hover)
  const [hovered, setHovered] = useState('');

  // triger ref for dropdown
  const ref = useRef<HTMLDivElement>(null);

  // api utils
  const [res, call] = useApi();

  // auth token
  const token = useToken();

  // tabs compponent hook
  const tabState = useTabs('Add');

  // active tab, tab state setter destructured from tabs hook
  const [active, setActive] = tabState;

  // darken a hex color in JS
  function darken<T>(comparands: [T, T], color: string): string {
    // if the comparands are equal (i.e. a hovered elemenet and the element in the DOM),
    // return a darkened color
    if (comparands[0] === comparands[1]) {
      return adjust(color, -40);
    }

    // otherwise, return a color
    return color;
  }

  // toggle the dropdown
  const toggle = async (): Promise<void> => {
    // if opening the dropdown, fetch the tagas
    if (!isOpen) {
      await call(fetchTagsQuery, [token]);
    }

    setIsOpen(!isOpen);
  };

  // if successful fetch, set the tags to local state
  useEffect(() => {
    if (res.data) {
      setTags(res.data.tags);
    }
  }, [res]);

  // render JSX according to which tab is active
  const renderTabs = (): JSX.Element => {
    // hover state (which tag is hovered, the state setter, and the darken function)
    const hs = { hovered, setHovered, darken };

    if (active === 'Add') {
      return <Add hs={hs} tags={tags} />;
    }

    if (active === 'Manage') {
      return (
        <Manage hs={hs} tags={tags} setTags={setTags} setTab={setActive} />
      );
    }

    if (active === 'Create') {
      return <Create hs={hs} setTags={setTags} />;
    }

    // fallback (should not occur)
    return <div>An error occurred</div>;
  };

  return (
    <>
      <div
        role='button'
        onClick={toggle}
        className={styles.tags}
        data-testid='tags'
      >
        <FiTag className={styles.icon} /> Tags
      </div>
      {isOpen && (
        <Dropdown
          bottom={nudgeBottom()}
          left={nudgeLeft()}
          css={styles.dropdown}
          refs={[ref]}
          setState={setIsOpen}
        >
          <Flex justify='space-between' align='center'>
            <Tabs
              state={tabState}
              resetOnUnmount
              tabs={['Add', 'Manage', 'Create']}
            />
            <Head size={13} setState={setIsOpen} />
          </Flex>
          {renderTabs()}
        </Dropdown>
      )}
    </>
  );
};

export default Tags;

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

interface Props {
  nudgeBottom: () => string | undefined;
  nudgeLeft: () => string | undefined;
}

const Tags: React.FC<Props> = ({ nudgeBottom, nudgeLeft }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState([] as Array<TagOnWorkout>);

  const ref = useRef<HTMLDivElement>(null);

  const [res, call] = useApi();

  const token = useToken();

  const tabState = useTabs('Add');

  const [active, setActive] = tabState;

  const toggle = async (): Promise<void> => {
    if (!isOpen) {
      await call(fetchTagsQuery, [token]);
    }

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (res.data) {
      setTags(res.data.tags);
    }
  }, [res]);

  const renderTabs = (): JSX.Element => {
    if (active === 'Add') {
      return <Add tags={tags} />;
    }

    if (active === 'Manage') {
      return <Manage tags={tags} setTags={setTags} setTab={setActive} />;
    }

    if (active === 'Create') {
      return <Create setTags={setTags} />;
    }

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

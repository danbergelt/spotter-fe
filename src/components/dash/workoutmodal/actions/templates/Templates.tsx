import React, { useState, useRef } from 'react';
import { FiPackage } from 'react-icons/fi';
import styles from './Templates.module.scss';
import Dropdown from 'src/components/lib/Dropdown';
import Flex from 'src/components/lib/Flex';
import Head from 'src/components/lib/Head';
import useTabs from 'src/hooks/useTabs';
import Tabs from 'src/components/lib/Tabs';

const Templates: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const tabState = useTabs('Manage');
  const [active] = tabState;

  return (
    <>
      <div
        ref={ref}
        role='button'
        onClick={(): void => setIsOpen(!isOpen)}
        className={styles.templates}
      >
        <FiPackage className={styles.icon} /> Templates
      </div>
      {isOpen && (
        <Dropdown refs={[ref]} setState={setIsOpen}>
          <Flex justify='space-between' align='center'>
            <Tabs resetOnUnmount state={tabState} tabs={['Manage', 'Create']} />
            <Head size={13} setState={setIsOpen} />
            {active === 'Manage' ? 'Foo' : 'Bar'}
          </Flex>
        </Dropdown>
      )}
    </>
  );
};

export default Templates;

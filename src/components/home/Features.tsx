import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import Flex from '../lib/Flex';
import styles from './Features.module.scss';
import weeklyview from '../../assets/weeklyview.png';
import monthlyview from '../../assets/monthlyview.png';
import prpage from '../../assets/prpage.png';

/*== Features =====================================================

Features component. Currently includes weekly view, monthly view,
and PR's page. Covers the various features of spotter (will scale up
as app scales up)

On desktop, reveal screenshots by hover. On mobile, reveal with a
select element.

*/

const Features: React.FC = () => {
  // image keys
  const WEEK_VIEW = '🔎 Weekly Calendar View';
  const MONTH_VIEW = '🗓 Monthly Calendar View';
  const PR_PAGE = '🤖 Automated PR Tracking';

  // currently selected screenshot
  const [selected, setSelected] = useState(WEEK_VIEW);

  // window width for inline styles
  const { width } = useWindowSize();

  // util function to dynamically set classname
  const setClass = (el: string): string => {
    if (selected === el) return styles.selected;
    return styles.feature;
  };

  const setVisibility = (thisState: string): 'none' | undefined => {
    if (selected !== thisState) {
      return 'none';
    }
    return undefined;
  };

  // wrapper component that surrounds both select and tabs
  const Wrapper: React.FC = ({ children }) => {
    return (
      <>
        <Flex
          css={styles.container}
          justify='center'
          align={width <= 1000 ? 'center' : undefined}
          fd={width <= 1000 ? 'column' : undefined}
        >
          <section className={styles.tabs}>
            <h2 className={styles.title}>Your features</h2>
            {children}
          </section>
          <img
            style={{
              display: setVisibility(WEEK_VIEW)
            }}
            src={weeklyview}
            className={styles.img}
            alt={WEEK_VIEW}
          />
          <img
            style={{
              display: setVisibility(MONTH_VIEW)
            }}
            src={monthlyview}
            className={styles.img}
            alt={MONTH_VIEW}
          />
          <img
            style={{ display: setVisibility(PR_PAGE) }}
            src={prpage}
            className={styles.img}
            alt={PR_PAGE}
          />
        </Flex>
      </>
    );
  };

  // if width <= 1000, render a select
  if (width <= 1000) {
    return (
      <Wrapper>
        <select
          data-testid='select'
          name='Feature Tabs'
          value={selected}
          onChange={(e): void => setSelected(e.target.value)}
          className={styles.select}
        >
          <option>{WEEK_VIEW}</option>
          <option>{MONTH_VIEW}</option>
          <option>{PR_PAGE}</option>
        </select>
      </Wrapper>
    );
  }

  // otherwise render the hoverable tabs
  return (
    <Wrapper>
      <p
        data-testid='tab'
        onClick={(): void => setSelected(WEEK_VIEW)}
        className={setClass(WEEK_VIEW)}
      >
        {WEEK_VIEW}
      </p>
      <p
        onClick={(): void => setSelected(MONTH_VIEW)}
        className={setClass(MONTH_VIEW)}
      >
        {MONTH_VIEW}
      </p>
      <p
        onClick={(): void => setSelected(PR_PAGE)}
        className={setClass(PR_PAGE)}
      >
        {PR_PAGE}
      </p>
    </Wrapper>
  );
};

export default Features;

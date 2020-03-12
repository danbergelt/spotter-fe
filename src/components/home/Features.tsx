import React, { useState } from 'react';
import { useWindowSize } from 'react-use';
import Flex from '../lib/Flex';
import styles from './Features.module.scss';

/*== Features =====================================================

Features component. Currently includes weekly view, monthly view,
and PR's page. Covers the various features of spotter (will scale up
as app scales up)

On desktop, reveal screenshots by hover. On mobile, reveal with a
select element.

*/

interface Props {
  images: string[];
}

const Features: React.FC<Props> = ({ images }) => {
  // image keys
  const WEEK_VIEW = 'Week View';
  const MONTH_VIEW = 'Month View';
  const PR_PAGE = 'PR Tracking';

  // currently selected screenshot
  const [selected, setSelected] = useState<string>(WEEK_VIEW);

  // window width for inline styles
  const { width } = useWindowSize();

  // util function to dynamically set classname
  const setClass = (el: string): string => {
    if (selected === el) {
      return styles.selected;
    }
    return styles.feature;
  };

  // render img based on img key
  const setImg = (): string => {
    if (selected === WEEK_VIEW) {
      return images[0];
    } else if (selected === MONTH_VIEW) {
      return images[1];
    } else {
      return images[2];
    }
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
            <h2 className={styles.title}>Features</h2>
            {children}
          </section>
          <img src={setImg()} className={styles.img} alt={selected} />;
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
          <option>Week View</option>
          <option>Month View</option>
          <option>PR Tracking</option>
        </select>
      </Wrapper>
    );
  }

  // otherwise render the hoverable tabs
  return (
    <Wrapper>
      <p
        data-testid='tab'
        onMouseOver={(): void => setSelected(WEEK_VIEW)}
        className={setClass(WEEK_VIEW)}
      >
        Week View
      </p>
      <p
        onMouseOver={(): void => setSelected(MONTH_VIEW)}
        className={setClass(MONTH_VIEW)}
      >
        Month View
      </p>
      <p
        onMouseOver={(): void => setSelected(PR_PAGE)}
        className={setClass(PR_PAGE)}
      >
        PR Tracking
      </p>
    </Wrapper>
  );
};

export default Features;

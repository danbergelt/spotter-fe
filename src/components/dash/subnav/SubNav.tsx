import React from 'react';
import SubnavDropdown from './SubnavDropdown';

// currently, the subnav only consists of one item - a scope modifier (month/week)
// if/when the app scales to include more functionailty. consider expanding this section and making use of the empty space

const SubNav: React.FC = () => {
  return (
    <div className='subnav-container spacer'>
      <section className='subnav-menu left'>
        <SubnavDropdown />
      </section>
    </div>
  );
};

export default SubNav;

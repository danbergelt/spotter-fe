import React from 'react';

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
}

const FeatureOptionsLarge: React.FC<Props> = ({ setSelected, selected }) => {
  return (
    <section className='features-tabs-container'>
      <p className='features-title'>Features</p>
      <p
        onMouseEnter={(): void => setSelected('Week View')}
        className={selected === 'Week View' ? 'feature selected' : 'feature'}
      >
        Week View
      </p>
      <p
        onMouseEnter={(): void => setSelected('Month View')}
        className={selected === 'Month View' ? 'feature selected' : 'feature'}
      >
        Month View
      </p>
      <p
        onMouseEnter={(): void => setSelected('PR Tracking')}
        className={selected === 'PR Tracking' ? 'feature selected' : 'feature'}
      >
        PR Tracking
      </p>
    </section>
  );
};

export default FeatureOptionsLarge;

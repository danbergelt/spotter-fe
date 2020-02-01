import React from 'react';

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
}

const FeatureOptions: React.FC<Props> = ({ selected, setSelected }) => {
  return (
    <section className='features-tabs-container'>
      <p className='features-title'>Features</p>
      <select
        name='Feature Tabs'
        value={selected}
        onChange={(e): void => setSelected(e.target.value)}
        className='feature-tabs-select'
      >
        <option>Week View</option>
        <option>Month View</option>
        <option>PR Tracking</option>
      </select>
    </section>
  );
};

export default FeatureOptions;

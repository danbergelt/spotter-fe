import React, { useState } from 'react';
import weeklyview from '../../assets/weeklyview.png';
import monthlyview from '../../assets/monthlyview.png';
import prpage from '../../assets/prpage.png';
import FeatureOptionsLarge from './FeatureOptionsLarge';
import FeatureOptions from './FeatureOptions';
import { useWindowSize } from 'react-use';

const Features: React.FC = () => {
  const [selected, setSelected] = useState<string>('Week View');

  const { width }: { width: number } = useWindowSize();

  const setImage = (): string => {
    if (selected === 'Week View') {
      return weeklyview;
    } else if (selected === 'Month View') {
      return monthlyview;
    } else {
      return prpage;
    }
  };

  return (
    <article className='features-container'>
      {width <= 1000 ? (
        <FeatureOptions selected={selected} setSelected={setSelected} />
      ) : (
        <FeatureOptionsLarge selected={selected} setSelected={setSelected} />
      )}
      <img className='features-img' src={setImage()} alt='Weekly View' />
    </article>
  );
};

export default Features;

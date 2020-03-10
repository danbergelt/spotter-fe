import React, { useEffect } from 'react';
import Hero from '../components/home/HomeHero';
import TextBlocks from '../components/home/TextBlocks';
import ImageText from '../components/home/ImageText';
import Features from 'src/components/home/Features';
import BottomCta from 'src/components/home/BottomCta';
import { Helmet } from 'react-helmet-async';
import weeklyview from '../assets/weeklyview.png';
import monthlyview from '..//assets/monthlyview.png';
import prpage from '../assets/prpage.png';

const Home: React.FC = () => {
  const images = [weeklyview, monthlyview, prpage];

  // preload images, prevent flickering when state changes
  // TODO --> move images to S3. Also, still getting
  // app stil flickers in development mode, but goes away
  // in production bundle. something to be wary of(?)
  useEffect(() => {
    images.forEach(image => {
      const _ = new Image();
      _.src = image;
    });
  }, [images]);

  return (
    <>
      <Helmet>
        <title>Spotter</title>
      </Helmet>
      <Hero />
      <TextBlocks />
      <ImageText />
      <Features images={images} />
      <BottomCta />
    </>
  );
};

export default Home;

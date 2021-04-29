import React from 'react';
import Carousel, { autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const MyCarousel = () => (
  <Carousel plugins={[
    'infinite',
    {
      resolve: autoplayPlugin,
      options: {
        interval: 1000,
      }
    },
  ]}
    animationSpeed={1000}>
    <img src="https://w3i7z3h8.stackpathcdn.com/wp-content/uploads/2020/07/Training-Time-Aug2020-GR-with-ball-scaled.jpg" />
    <img src="https://www.thesprucepets.com/thmb/EBp990AJt94XwAp7oOAzUtdg9Xg=/2121x1193/smart/filters:no_upscale()/golden-retriever-puppy-in-grass-923135452-5c887d4146e0fb00013365ba.jpg" />
    <img src="https://w3i7z3h8.stackpathcdn.com/wp-content/uploads/2020/07/Training-Time-Aug2020-GR-with-ball-scaled.jpg" />
  </Carousel>
);

export default MyCarousel;
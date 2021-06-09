import React from 'react';
import Carousel, { autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

const MyCarousel = () => (
  <div style={carouselStyles}>
    <Carousel plugins={[
      'infinite',
      'arrows',
      {
        resolve: autoplayPlugin,
        options: {
          interval: 5000,
        }
      },
    ]}
      animationSpeed={1000}>
      <img alt="emaus1" src="https://firebasestorage.googleapis.com/v0/b/emaus-49818.appspot.com/o/carousel%2FEmaus1.jpeg?alt=media&token=760fddc6-fddd-4b0f-a02a-4ee6e807a4a7" />
      <img alt="emaus2" src="https://firebasestorage.googleapis.com/v0/b/emaus-49818.appspot.com/o/carousel%2FEmaus3.jpeg?alt=media&token=414a9962-6f42-4d3e-ac5c-530e6e79d6df" />
      <img alt="emaus3" src="https://firebasestorage.googleapis.com/v0/b/emaus-49818.appspot.com/o/carousel%2FEmaus2.jpeg?alt=media&token=5a5cad8f-011c-4d32-9ff9-ff8d963a1cc1" />
      <img alt="emaus4" src="https://firebasestorage.googleapis.com/v0/b/emaus-49818.appspot.com/o/carousel%2FEmaus4.jpeg?alt=media&token=f4aa9756-bc44-497c-84e1-992c73dce62d" />
    </Carousel>
  </div>
);

const carouselStyles = {
  margin: 'auto',
  width: "100%",
  maxWidth: "1000px"
}

export default MyCarousel;
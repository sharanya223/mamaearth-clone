import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="arrow next" onClick={onClick}>
      ❯
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="arrow prev" onClick={onClick}>
      ❮
    </div>
  );
}

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: false,         // Hide the dot indicators if needed
    infinite: true,      // Loop the carousel
    speed: 500,          // Transition speed
    slidesToShow: 1,     // Show one slide at a time
    slidesToScroll: 1,
    autoplay: true,      // Auto-play the slides
    autoplaySpeed: 3000, // Change image every 3 seconds
    arrows: true,        //enable cusom arrows 
    nextArrow :<NextArrow />,
    prevArrow :<PrevArrow />

            
  };

  return (
    <div className="carousel-wrapper"> { }
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="carousel-image " />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
import React from 'react';
import Slider from 'react-slick';
import ImageGameCard from './ImageGameCard';

const SliderContainer = ({ slides, type, infinite, autoplay, centerMode, focusOnSelect, onChange }) => {
  const isEnoughSlides = (len) => (slides.length <= len ? slides.length : len);
  const settings = {
    draggable: false,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: centerMode ? isEnoughSlides(5) : isEnoughSlides(4.5),
    slidesToScroll: 1,
    centerMode: centerMode || false,
    autoplay: autoplay || false,
    arrows: true,
    infinite: infinite || false,
    focusOnSelect: focusOnSelect || onChange !== undefined,
    beforeChange: (current, next) => onChange !== undefined && onChange(current, next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: centerMode ? isEnoughSlides(3) : isEnoughSlides(3.5),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: centerMode ? isEnoughSlides(1.5) : isEnoughSlides(2.5),
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider className="-mx-4" {...settings}>
      {slides.map((slide, index) => (
        <div key={slide._id || index} className="h-full max-w-[230px] md:max-w-[320px]">
          {type === 'games' && <ImageGameCard key={slide._id} game={slide} />}
          {type === 'trailers' && (
            <img className="object-cover rounded-md border-[1px] border-neutral-800" src={slide.thumbnail} alt={slide.id} />
          )}

          {type === 'screenshots' && (
            <img
              className="object-cover rounded-md border-[1px] border-neutral-800"
              src={slide.path_thumbnail}
              alt={slide.id}
              loading="lazy"
            />
          )}
        </div>
      ))}
    </Slider>
  );
};

export default SliderContainer;

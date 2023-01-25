import React from 'react';
import Slider from 'react-slick';
import ImageGameCard from './ImageGameCard';

const SliderContainer = ({ slides, type, infinite }) => {
  const settings = {
    draggable: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    centerMode: false,
    arrows: true,
    infinite: infinite,
    focusOnSelect: type === 'screenshots' || type === 'trailers',
    className: 'center',
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div className="flex-none h-full max-w-[230px] md:max-w-[320px]">
          {type === 'games' && <ImageGameCard key={slide._id} game={slide} />}
          {type === 'trailers' && <ImageGameCard key={slide._id} game={slide} />}

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

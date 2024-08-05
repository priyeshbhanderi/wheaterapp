import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import Wing from "./assets/images/pngwing_shose.png";
import Wing2 from "./assets/images/product1png.png";

SwiperCore.use([Navigation]);

const ImageGallery = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = [{ img: Wing }, { img: Wing2 }, { img: Wing }, { img: Wing }];
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveImageIndex(swiper.activeIndex);
  };

  const handlePrevClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
      setActiveImageIndex(swiperRef.current.swiper.activeIndex);
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
      setActiveImageIndex(swiperRef.current.swiper.activeIndex);
    }
  };

  const OnClick = (item, index) => {
    setActiveImageIndex(index);
  };

  return (
    <div className="w-full xl:1/2 flex xl:flex-row flex-col">
      <div className="xl:w-10/12 bg-slate-200 flex justify-center items-center rounded-2xl py-5">
        <img
          src={images[activeImageIndex].img}
          key={images[activeImageIndex].img}
          alt="Main"
          className="lg:h-80 w-2/5 h-60 md:h-80"
          data-aos="fade"
        />
      </div>
      <div className="xl:w-2/12 flex xl:flex-col flex-row mt-3 xl:mt-0 xl:gap-5 gap-1 justify-center items-center xl:ms-5">
        <div className="relative h-fit w-full">
          <Swiper
            ref={swiperRef}
            slidesPerView={4}
            spaceBetween={10}
            onSlideChange={handleSlideChange}
            className="mySwiper h-[10vh] w-full lg:h-[12vh] md:h-[15vh] xl:h-[51vh]"
          >
            {images.map((item, index) => (
              <SwiperSlide
                key={index}
                className={`xl:h-28 xl:w-28 h-24 w-24 bg-slate-200 py-2 px-4 flex justify-center items-center rounded-2xl 
                  ${activeImageIndex === index ? "border-2 border-black" : ""}`}
                onClick={() => OnClick(item, index)}
              >
                <img
                  src={item.img}
                  alt={`Thumbnail ${index}`}
                  className="hover-effect h-full w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="absolute z-50 left-9 -top-5 bg-gray-800 text-white p-2 rounded-full"
            onClick={handlePrevClick}
          >
            Prev
          </button>
          <button
            className="absolute z-50 right-9 -bottom-5 bg-gray-800 text-white p-2 rounded-full"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

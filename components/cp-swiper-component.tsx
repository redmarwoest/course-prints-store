"use client";

import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CpProductCard from "./product/cp-product-card";

const mockSlides = [
  {
    name: "Michael T.",
    image: "/avatars/michael.jpg",
    review: "Absolutely love my custom golf print! The quality is amazing.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    image: "/avatars/sarah.jpg",
    review: "A unique gift for my husband. He was thrilled!",
    rating: 5,
  },
  {
    name: "John D.",
    image: "/avatars/john.jpg",
    review: "Fast shipping and beautiful design. Highly recommend.",
    rating: 4,
  },
  {
    name: "Emma R.",
    image: "/avatars/emma.jpg",
    review: "The print looks fantastic in our living room.",
    rating: 4,
  },
  {
    name: "Peter P.",
    image: "/avatars/peter.jpg",
    review: "Great customer service and a stunning product.",
    rating: 5,
  },
];

const CpSwiperComponent = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div
      onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      className="relative"
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          480: { slidesPerView: 1 },
          640: { slidesPerView: 2 }, // ≥640px screens
          1024: { slidesPerView: 3 }, // ≥1024px screens
          1280: { slidesPerView: 4 }, // ≥1280px screens
          1600: { slidesPerView: 5 },
        }}
        spaceBetween={12}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSlideChange={() => swiperRef.current?.autoplay?.stop()}
        className="mySwiper"
      >
        {mockSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <CpProductCard
              image="/products/golf-poster.jpg"
              title="Golf Course Print"
              description="A beautiful print of your favorite golf course."
              price="€49.99"
              buttonText="Add to Cart"
              onButtonClick={() => alert("Added to cart!")}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex absolute right-0 gap-4 mr-[112px] w-[12px] top-[-48px]">
        <button className="swiper-button-prev cp-circle-button  left-[64px] ">
          <img className="ml-[2px]" src="/icon-arrow.svg" alt="." />
        </button>
        <button className="swiper-button-next cp-circle-button rotate-180">
          <img className="ml-[2px]" src="/icon-arrow.svg" alt="." />
        </button>
      </div>
    </div>
  );
};

export default CpSwiperComponent;

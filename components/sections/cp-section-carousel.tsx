import Link from "next/link";
import CpSwiperComponent from "../cp-swiper-component";

const SectionCarousel = () => {
  return (
    <section className="w-full mt-[128px] flex flex-col ">
      <h2 className=" font-bold mb-8 ml-[80px]">
        Our <strong className="font-bold">Legends</strong> collection
      </h2>
      <div className="w-full px-4">
        <CpSwiperComponent />
      </div>
      <div className="flex justify-center mt-16">
        <Link className="cp-button w-auto" href={""}>
          See all collections
        </Link>
      </div>
    </section>
  );
};

export default SectionCarousel;

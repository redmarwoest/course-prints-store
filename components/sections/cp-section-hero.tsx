import Image from "next/image";

const SectionHero = ({}) => {
  return (
    <section className="w-full min-h-[80vh] relative overflow-hidden">
      <div className="absolute h-[60vh] w-screen bg-[#23533b] border-b-[40px] border-[#ffce2b]"></div>
      <div className="relative mx-auto px-4 md:px-[80px] w-[100%] md:flex-row flex-col">
        <h1 className="w-full text-center text-xl md:text-2xl lg:text-3xl text-[#ffffff] mt-10 mb-10 z-1">
          Your golf story, beautifully framed
        </h1>
        <div className="relative w-[100%] md:h-[75vh] h-[65vh] overflow-hidden">
          <Image
            src="/background.jpg"
            alt="Golf story"
            fill
            className="absolute object-cover rounded-[2px]"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default SectionHero;

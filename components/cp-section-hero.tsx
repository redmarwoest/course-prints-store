const SectionHero = ({}) => {
  return (
    <section className="w-full min-h-[80vh] bg-[#fbfbfb] relative overflow-hidden">
      <div className="absolute h-[60vh] w-screen bg-[#23533b] border-b-[40px] border-[#ffce2b]"></div>
      <div className="relative max-w-7xl mx-auto  w-full md:flex-row flex-col md:text-left text-center">
        <h1 className="w-full text-center text-xl md:text-2xl lg:text-3xl text-[#ffffff] mt-10 mb-10 z-1">
          Your golf story, beautifully framed
        </h1>
        <div className="w-full max-w-[1620px] px-4 md:px-[54px] h-[75vh] bg-white">
          <img
            src="/images/hero-image.jpg"
            alt="Golf story"
            className="w-100 h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionHero;

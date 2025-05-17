"use client";

const SectionCustom = ({}) => {
  return (
    <section className="w-full h-screen bg-white">
      <div className="max-w-[1620px] mx-auto px-4 md:px-[54px] h-[75vh]">
        <div className="flex flex-col md:flex-row gap-12 h-full items-top">
          <div className="w-full md:w-3/4 h-full bg-red-500">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="w-full md:w-1/4 flex flex-col justify-center">
            <span>Custom</span>
            <h2>Golf Story</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
            <button className="cp-button">Customize</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCustom;

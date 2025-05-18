"use client";

const SectionCustom = ({}) => {
  return (
    <section className="w-full  bg-white mt-[128px]">
      <div className="max-w-[1620px] mx-auto px-4 md:px-[80px] h-[70vh]">
        <div className="flex flex-col md:flex-row flex-col-reverse gap-[40px] md:gap-[80px] md:h-full h-auto items-top">
          <div className="w-full md:w-[70%] h-full bg-gray-100">
            <video
              className="w-full h-full min-h-[320px] object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="w-full md:w-[30%] flex flex-col mt-0 px-4 md:px-0 md:py-16 h-[100%] justify-between">
            <div>
              <span>Custom</span>
              <h2>Golf Story</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </p>
            </div>
            <div className="flex ">
              <button className="cp-button mt-16 w-auto">
                Create your own story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCustom;

const SectionTwoColumns = () => (
  <section className="w-full flex justify-center mt-[128px]">
    <div className="w-full max-w-[1620px] px-4 md:px-[80px] flex flex-col md:flex-row gap-3">
      <div
        className="
          w-full
          aspect-square
          md:aspect-auto md:h-[70vh] md:w-1/2
          bg-gray-100
          flex items-center justify-center
          border-radius-[2px]
        "
      >
        <h2>Left</h2>
      </div>
      <div
        className="
          w-full
          aspect-square
          md:aspect-auto md:h-[70vh] md:w-1/2
          bg-gray-100
          flex items-center justify-center
            border-radius-[2px]
        "
      >
        <h2>Right</h2>
      </div>
    </div>
  </section>
);

export default SectionTwoColumns;

import Image from "next/image";
import styles from "../../../../app/styles/ui-components/cp-wall-render.module.scss";

interface WallRenderProps {
  children: React.ReactNode;
  size: string;
  orientation: boolean | undefined;
}

const CpWallRender = ({ children, size, orientation }: WallRenderProps) => {
  const getDimensions = (sizeStr: string) => {
    const [width, height] = sizeStr
      .split("x")
      .map((dim) => parseFloat(dim.trim()));

    if (orientation === true) {
      return [height, width];
    }
    return [width, height];
  };

  const [width, height] = getDimensions(size);

  const frameStyle = {
    "--frame-width": `${width}`,
    "--frame-height": `${height}`,
  } as React.CSSProperties;

  return (
    <div className={styles["wall-render"]}>
      <div className="wall-render__inner">
        <div className={styles["wall-render__room"]}>
          <Image
            className={styles["wall-render__room-img"]}
            src="/background.jpg"
            alt="Room Background"
            width={1920}
            height={1080}
            priority
          />
        </div>

        <div
          className={styles["wall-render__frame-container"]}
          style={frameStyle}
        >
          <div className={styles["wall-render__shadow"]} />
          <div className={styles["wall-render__frame"]}>
            <div
              className={`${styles["wall-render__poster"]} ${
                size === "21 x 29.7 cm"
                  ? styles["wall-render__poster--size-21x29"]
                  : size === "30 x 40 cm"
                    ? styles["wall-render__poster--size-30x40"]
                    : size === "40 x 50 cm"
                      ? styles["wall-render__poster--size-40x50"]
                      : size === "50 x 70 cm"
                        ? styles["wall-render__poster--size-50x70"]
                        : ""
              } ${
                orientation && size === "21 x 29.7 cm"
                  ? styles["wall-render__poster--size-21x29--horizontal"]
                  : orientation && size === "30 x 40 cm"
                    ? styles["wall-render__poster--size-30x40--horizontal"]
                    : orientation && size === "40 x 50 cm"
                      ? styles["wall-render__poster--size-40x50--horizontal"]
                      : orientation && size === "50 x 70 cm"
                        ? styles["wall-render__poster--size-50x70--horizontal"]
                        : ""
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CpWallRender;

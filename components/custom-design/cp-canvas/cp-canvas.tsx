"use client";
import Image from "next/image";
import { forwardRef, useEffect, useMemo, useState } from "react";
import styles from "../../../app/styles/ui-components/cp-canvas.module.scss";
import { ColorScheme, ColorSchemes, FormData } from "../../../app/types/types";
import { colorSchemes } from "../../../constants/cp-color-scheme/cp-color-scheme";
import { updateSvgColors } from "../../../utils/parserFunction";
import ScoreCard from "../cp-form-components/cp-score-card/cp-score-card";
import WallRender from "../cp-form-components/cp-wall-render/cp-wall-render";

const CpCanvas = forwardRef<HTMLDivElement, { data: FormData }>(
  ({ data }, ref) => {
    const {
      title,
      subTitle,
      underTitle,
      isHorizontal,
      courses,
      selectedCourseMap,
      selectedSize,
      showScorecard,
      colorScheme,
      longitude,
      latitude,
      selectedCourseIndex,
      wallRender,
    } = data;

    const [MapComponent, setMapComponent] = useState<React.ComponentType<{
      latitude: string;
      longitude: string;
    }> | null>(null);

    useEffect(() => {
      if (typeof window !== "undefined") {
        import("../cp-form-components/cp-render-map/cp-render-map").then(
          (mod) => {
            setMapComponent(() => mod.default);
          }
        );
      }
    }, []);

    const selectedColors: ColorScheme =
      colorSchemes[colorScheme as keyof ColorSchemes];

    const mapContent = useMemo(() => {
      if (
        (selectedCourseMap === null || selectedCourseMap === "") &&
        latitude &&
        longitude
      ) {
        if (!MapComponent) return null;
        return <MapComponent latitude={latitude} longitude={longitude} />;
      }

      if (selectedCourseMap) {
        if (typeof window !== "undefined") {
          const updatedSvg = updateSvgColors(
            selectedCourseMap,
            selectedColors as unknown as Record<string, string>
          );

          return (
            <div
              className={styles["cp-canvas__box--map-svg"]}
              dangerouslySetInnerHTML={{ __html: updatedSvg }}
            />
          );
        }

        return (
          <div
            className={styles["cp-canvas__box--map-svg"]}
            dangerouslySetInnerHTML={{ __html: selectedCourseMap }}
          />
        );
      }

      return null;
    }, [
      courses,
      selectedCourseMap,
      selectedCourseIndex,
      selectedColors,
      MapComponent,
      latitude,
      longitude,
    ]);

    const textContent = (
      <svg
        className={styles["cp-canvas__box--text-svg"]}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 100 100"
      >
        <text
          x="50"
          y={isHorizontal ? "55" : "60"}
          textAnchor="middle"
          className={`${
            isHorizontal
              ? styles["cp-canvas__box--text--horizontal-title"]
              : styles["cp-canvas__box--text-title"]
          }`}
          fill={selectedColors.textColor}
        >
          {title}
        </text>
        <text
          x="50"
          y={isHorizontal ? "77" : "77"}
          textAnchor="middle"
          className={`${
            isHorizontal
              ? styles["cp-canvas__box--text--horizontal-subtitle"]
              : styles["cp-canvas__box--text-subtitle"]
          }`}
          fill={selectedColors.textColor}
        >
          {subTitle}
        </text>
        <text
          x="50"
          y={isHorizontal ? "95" : "89"}
          textAnchor="middle"
          className={`${
            isHorizontal
              ? styles["cp-canvas__box--text--horizontal-undertitle"]
              : styles["cp-canvas__box--text-undertitle"]
          }`}
          fill={selectedColors.textColor}
        >
          {underTitle}
        </text>
      </svg>
    );

    const canvasContent = (
      <div
        ref={ref}
        id="canvas-element"
        className={`${
          isHorizontal
            ? styles["cp-canvas__box--horizontal"]
            : styles["cp-canvas__box"]
        } 
      ${colorScheme ? styles[`cp-canvas__box--${colorScheme}`] : ""}`}
      >
        <div
          className={`${styles["cp-canvas__box--outline"]} ${
            styles["cp-canvas__box--outline--fat"]
          } ${
            wallRender ? styles["cp-canvas__box--outline--fat--wallrender"] : ""
          } ${
            colorScheme ? styles[`cp-canvas__box--outline--${colorScheme}`] : ""
          } ${wallRender ? styles["cp-canvas__box--outline--wallrender"] : ""}`}
        >
          <div
            className={`${styles["cp-canvas__box--outline"]} ${
              colorScheme
                ? styles[`cp-canvas__box--outline--${colorScheme}`]
                : ""
            } ${
              wallRender ? styles["cp-canvas__box--outline--wallrender"] : ""
            }`}
          >
            <div
              className={`${
                isHorizontal
                  ? styles["cp-canvas__box--nav--horizontal"]
                  : styles["cp-canvas__box--nav"]
              }`}
            >
              <Image
                src="/compast-test.svg"
                alt="Compass"
                width={48}
                height={48}
              />
            </div>
            <div className={styles["cp-canvas__box--map"]}>{mapContent}</div>
            {showScorecard && (
              <div className={styles["cp-canvas__box--scorecard"]}>
                <ScoreCard
                  numHoles={9}
                  pars={[4, 3, 5, 4, 4, 3, 5, 4, 4]}
                  distance={[320, 150, 450, 310, 360, 170, 500, 330, 340]}
                />
              </div>
            )}
          </div>
          <div
            className={`${
              isHorizontal
                ? styles["cp-canvas__box--text--horizontal"]
                : styles["cp-canvas__box--text"]
            }`}
          >
            {textContent}
          </div>
        </div>
      </div>
    );

    return (
      <div
        className={`${styles["cp-canvas"]} 
        ${colorScheme ? styles[`cp-canvas--${colorScheme}`] : ""}`}
      >
        <div className={styles["cp-canvas__inner"]}>
          {data.wallRender ? (
            <WallRender
              size={selectedSize || "21 x 29.7 cm"}
              orientation={isHorizontal}
            >
              {canvasContent}
            </WallRender>
          ) : (
            canvasContent
          )}
        </div>
      </div>
    );
  }
);

CpCanvas.displayName = "CpCanvas";

export default CpCanvas;

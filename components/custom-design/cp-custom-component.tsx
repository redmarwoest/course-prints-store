"use client";
import CpCanvas from "components/custom-design/cp-canvas/cp-canvas";
import CpForm from "components/custom-design/cp-form/cp-form";
import { Product } from "lib/shopify/types";
import { useState } from "react";
import { FormData } from "../../app/types/types";

export default function CpCustomComponent({ product }: { product: Product }) {
  const [canvasData, setCanvasData] = useState<FormData>({
    title: "Course Name",
    subTitle: "Location",
    underTitle: "",
    isHorizontal: false,
    showScorecard: false,
    showCustomTitle: false,
    showDate: false,
    selectedSize: "21 x 29.7 cm",
    quantity: 1,
    price: 29.95,
    colorScheme: "basic",
    isLoadingClub: false,
    isAddingToCart: false,
    hasFrame: false,
  });

  return (
    <>
      <CpForm
        onChange={setCanvasData}
        defaultValues={canvasData}
        product={product}
      />
      <CpCanvas data={canvasData} />
    </>
  );
}

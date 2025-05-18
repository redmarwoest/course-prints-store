import React from "react";

type ProductCardProps = {
  image: string;
  title: string;
  description?: string;
  price?: string | number;
  buttonText?: string;
  onButtonClick?: () => void;
};

const CpProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  price,
}) => (
  <div className="w-full h-[480px] bg-gray-100 rounded-sm flex flex-col justify-end">
    {/* <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover mb-4 rounded"
    /> */}
    <div className="p-4 flex justify-between items-center">
      <h3 className="text-lg font-semibold ">{title}</h3>
      {price && (
        <div className="flex items-center gap-2">
          <div className="cp-pill">{price}</div>
        </div>
      )}
    </div>
  </div>
);

export default CpProductCard;

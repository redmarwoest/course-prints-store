"use client";

import { motion } from "framer-motion";
import React from "react";

interface Review {
  id: number;
  text: string;
  author: string;
  rating: number;
}

interface ThemeProps {
  theme?: {
    background?: string;
    border?: string;
    text?: string;
    primary?: string;
    secondary?: string;
  };
}

const reviews: Review[] = [
  {
    id: 1,
    text: "Amazing service and quality products! Will definitely shop here again.",
    author: "Sarah M.",
    rating: 5,
  },
  {
    id: 2,
    text: "The best shopping experience I've had online. Fast shipping!",
    author: "John D.",
    rating: 5,
  },
  {
    id: 3,
    text: "Great customer service and excellent product selection.",
    author: "Emma R.",
    rating: 4,
  },
  {
    id: 4,
    text: "Love the quality of their products. Highly recommended!",
    author: "Michael T.",
    rating: 5,
  },
];

const ReviewMarquee: React.FC = () => {
  const duplicatedReviews = [...reviews, ...reviews];

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const formattedAverage = averageRating.toFixed(1);

  return (
    <div className="w-full overflow-hidden relative flex">
      <div className="sticky left-0 bg-white p-4 border-r border-b border-[#ECECEB] flex items-center gap-2 z-10">
        <div className="flex items-center gap-2 border border-[#ECECEB] p-2 px-4 rounded-full">
          <div className="text-[#ffce2b] ">{"★"}</div>
          <div className="text-m font-bold ">{formattedAverage}</div>
          <div className="text-sm text-[#181818]">({reviews.length})</div>
        </div>
      </div>
      <motion.div
        className="flex"
        animate={{
          x: [0, -300 * reviews.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {duplicatedReviews.map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className="min-w-[300px] bg-white p-3 border-l border-b border-[#ECECEB] flex items-center gap-2"
          >
            <div className="w-10 h-10 border border-[#ECECEB] rounded-full"></div>
            <div>
              <p className="font-tiempos-headline">{review.author}</p>
              <div className="text-[#ffce2b]">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
            <div className="ml-auto mb-4">
              <img src="/images/cp-review-marquee/quote.svg" alt="." />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ReviewMarquee;

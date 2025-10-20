"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const testimonials = [
  {
    text: `“Working with Jodi changed everything. What she’s built with Brandiie is like unlocking your own creative director, content coach, and AI strategist in one go. It nailed my voice and gave me momentum I didn’t think was possible.”`
  },
  {
    text: `“My team is obsessed! Brandiie turned employee advocacy into a movement.”`
  },
  {
    text: `“I didn't even know what a personal brand was. Now I am absolutely converted and blown away by how much this has helped me personally and professionally”`
  },
  {
    text: `“This has helped my confidence beyond words. Thank you for giving me my confidence back and a plan to show up online”`
  }
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative w-full max-w-[886px] mx-auto pt-14 lg:pt-20">
      <div className="relative flex items-center justify-center h-[200px]">
        {testimonials.map((t, i) => {
          const position =
            (i - index + testimonials.length) % testimonials.length;

          // position 0 = active, 1 = next, others = behind
          let scale = 1;
          let translateX = 0;
          let translateY = 0;
          let zIndex = 1;
          let opacity = 0;

          if (position === 0) {
            scale = 1;
            zIndex = 3;
            opacity = 1;
          } else if (position === 1) {
            scale = 0.95;
            translateX = 0;
            translateY = -20;
            zIndex = 2;
            opacity = 0.7;
          } else {
            scale = 0.9;
            translateX = 0;
            translateY = -30;
            zIndex = 1;
            opacity = 0;
          }

          return (
            <motion.div
              key={i}
              className="absolute bg-background rounded-[20px] shadow-2xl p-6 w-full h-full grid place-content-center text-start"
              style={{ zIndex }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity, scale, x: translateX, y: translateY }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-base lg:text-[26px] font-semibold text-primary line-clamp-6 lg:line-clamp-4">
                {position === 0 ? t.text : ""}
              </p>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-center gap-5 mt-20">
        <Button
          variant="outline"
          size="icon"
          className="static lg:absolute top-[55%] -translate-y-full -left-20 rounded-full border-none"
          onClick={prev}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="static lg:absolute top-[55%] -translate-y-full -right-20 rounded-full border-none"
          onClick={next}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

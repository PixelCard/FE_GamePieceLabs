"use client";
// src/components/ImageComparison/ImageComparison.tsx
import * as Slider from "react-compare-slider/components";
import { useReactCompareSlider } from "react-compare-slider/hooks";

type ImageComparisonProps = {
  imageOne: string;
  imageTwo: string;
};

export const ImageComparison = ({
  imageOne,
  imageTwo,
}: ImageComparisonProps) => {
  const sliderProps = useReactCompareSlider({
    portrait: false,
    transition: "0.15s ease-out",
  });

  return (
    <div className="mx-auto overflow-hidden rounded-xl w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] sm:max-w-[620px] lg:max-w-[940px] xl:w-[calc(70%-50px)] xl:max-w-[1080px]">
      <Slider.Provider {...sliderProps}>
        <Slider.Root className="relative">
          <Slider.Item item="itemOne">
            <Slider.Image src={imageOne} alt="Image one" />
          </Slider.Item>
          <Slider.Item item="itemTwo">
            <Slider.Image src={imageTwo} alt="Image two" />
          </Slider.Item>
          <Slider.HandleRoot>
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://w3.org"
              className="absolute top-1/2 -translate-y-1/2 w-5 h-7 md:w-10 md:h-10"
            >
              <circle cx="20" cy="20" r="20" fill="white" />
              <rect x="14" y="11" width="3" height="18" rx="1.5" fill="black" />
              <rect x="19" y="11" width="3" height="18" rx="1.5" fill="black" />
              <rect x="24" y="11" width="3" height="18" rx="1.5" fill="black" />
            </svg>
          </Slider.HandleRoot>
        </Slider.Root>
      </Slider.Provider>
    </div>
  );
};

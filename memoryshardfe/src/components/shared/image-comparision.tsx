'use client';
// src/components/ImageComparison/ImageComparison.tsx
import * as Slider from 'react-compare-slider/components';
import { useReactCompareSlider } from 'react-compare-slider/hooks';

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
        transition: '0.15s ease-out',
    });

    return (
        <div className="mx-auto overflow-hidden rounded-xl w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] sm:max-w-[620px] lg:max-w-[940px] xl:w-[calc(70%-50px)] xl:max-w-[1080px]">
            <Slider.Provider {...sliderProps}>
                <Slider.Root>
                    <Slider.Item item="itemOne">
                        <Slider.Image src={imageOne} alt="Image one" />
                    </Slider.Item>
                    <Slider.Item item="itemTwo">
                        <Slider.Image src={imageTwo} alt="Image two" />
                    </Slider.Item>
                    <Slider.HandleRoot>
                        <Slider.Handle />
                    </Slider.HandleRoot>
                </Slider.Root>
            </Slider.Provider>
        </div>
    );
};

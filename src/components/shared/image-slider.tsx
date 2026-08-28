'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/utils/cn';

export type ImageSliderSlide = {
    id: string | number;
    title: string;
    subtitle: string;
    badge: string;
    imageSrc: string;
    imageAlt: string;
    ctaLabel: string;
    ctaHref: string;
};

export type ImageSliderProps = {
    slides: readonly ImageSliderSlide[];
    autoplay?: boolean;
    autoplayInterval?: number;
    ariaLabel?: string;
    className?: string;
};

export function ImageSlider({
    slides,
    autoplay = true,
    autoplayInterval = 3000,
    ariaLabel = 'Featured collections',
    className,
}: ImageSliderProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        const updateCurrentSlide = () => {
            setCurrentSlide(api.selectedScrollSnap());
        };

        updateCurrentSlide();
        api.on('select', updateCurrentSlide);
        api.on('reInit', updateCurrentSlide);

        return () => {
            api.off('select', updateCurrentSlide);
            api.off('reInit', updateCurrentSlide);
        };
    }, [api]);

    useEffect(() => {
        if (!api || !autoplay || slides.length < 2) {
            return;
        }

        const intervalId = window.setInterval(() => {
            api.scrollNext();
        }, autoplayInterval);

        return () => window.clearInterval(intervalId);
    }, [api, autoplay, autoplayInterval, slides.length]);

    if (slides.length === 0) {
        return null;
    }

    const hasMultipleSlides = slides.length > 1;

    return (
        <Carousel
            setApi={setApi}
            opts={{ loop: hasMultipleSlides }}
            aria-label={ariaLabel}
            className={cn(
                'w-full overflow-hidden rounded-xl shadow-[0_18px_60px_rgba(15,23,42,0.16)]',
                className,
            )}
        >
            <CarouselContent className="ml-0">
                {slides.map((slide, index) => (
                    <CarouselItem key={slide.id} className="pl-0">
                        <div className="relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-[440px] xl:h-[480px]">
                            <Image
                                src={slide.imageSrc}
                                alt={slide.imageAlt}
                                fill
                                preload={index === 0}
                                sizes="100vw"
                                className="object-cover"
                            />
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent"
                            />
                            <div className="absolute inset-0 flex max-w-2xl flex-col items-start justify-center p-5 text-white sm:p-8 lg:p-12">
                                <span className="mb-2 sm:mb-3 inline-flex rounded-full bg-blue-600/80 px-3.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-50 backdrop-blur-sm shadow-sm">
                                    {slide.badge}
                                </span>
                                <h2 className="type-h1 sm:type-h0 max-w-2xl text-balance">
                                    {slide.title}
                                </h2>
                                <p className="mt-2 sm:mt-3 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-white/85 line-clamp-2 sm:line-clamp-none">
                                    {slide.subtitle}
                                </p>
                                <Link
                                    href={slide.ctaHref}
                                    className="mt-3 sm:mt-5 inline-flex items-center rounded-full bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-bold text-neutral-950 shadow-md transition-all hover:bg-neutral-100 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
                                >
                                    {slide.ctaLabel}
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {hasMultipleSlides ? (
                <>
                    <CarouselPrevious className="left-3 sm:left-4 z-20 size-8 sm:size-10 border-0 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-105 hover:text-white" />
                    <CarouselNext className="right-3 sm:right-4 z-20 size-8 sm:size-10 border-0 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/70 hover:scale-105 hover:text-white" />

                    <div className="absolute inset-x-0 bottom-3 sm:bottom-4 z-20 flex justify-center gap-1.5 sm:gap-2">
                        {slides.map((slide, index) => (
                            <Button
                                key={slide.id}
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={
                                    currentSlide === index ? 'true' : undefined
                                }
                                onClick={() => api?.scrollTo(index)}
                                className={cn(
                                    'h-2 rounded-full p-0 transition-all duration-300',
                                    currentSlide === index
                                        ? 'w-6 bg-white shadow-sm'
                                        : 'w-2 bg-white/50 hover:bg-white/80',
                                )}
                            />
                        ))}
                    </div>
                </>
            ) : null}
        </Carousel>
    );
}

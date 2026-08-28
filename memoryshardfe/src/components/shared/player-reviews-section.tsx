'use client';

import * as React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PlayerReview {
    id: string;
    author: string;
    rating: number;
    paragraphs: string[];
}

const PLAYER_REVIEWS: readonly PlayerReview[] = [
    {
        id: 'review-1',
        author: 'Maximilian',
        rating: 5,
        paragraphs: [
            'I was particularly impressed with the care and attention to detail Laserox show and this is evident in the design of the product, but also the individual message of thanks included and their rapid and informative response to questions. It is very clear that they sincerely care about customer satisfaction and are intending on making a quality product. I wholeheartedly support this mindset.',
            'The assembly was mostly intuitive and presented no real problems and once complete fits perfectly and looks great. Should I ever need similar organisers for other games in future, I will most definitely be looking at Laserox first.',
        ],
    },
    {
        id: 'review-2',
        author: 'Andrew',
        rating: 5,
        paragraphs: [
            'Absolutely beautiful. Great design and solid workmanship. Makes setting up and breaking down the game a breeze.',
        ],
    },
    {
        id: 'review-3',
        author: 'Christopher',
        rating: 5,
        paragraphs: [
            'It is my first laserox insert, but this one is gorgeous. The small details with thematic engravings look very nice. It does take some time to put all things together, but that is part of the fun. Really like it.',
        ],
    },
    {
        id: 'review-4',
        author: 'Sarah L.',
        rating: 5,
        paragraphs: [
            'Outstanding precision and quality! All miniature compartments and token trays fit smoothly into the original game box. Premium finish throughout.',
        ],
    },
    {
        id: 'review-5',
        author: 'David M.',
        rating: 5,
        paragraphs: [
            'Top notch materials and exceptionally thoughtful packaging. Everything arrived promptly and in pristine condition. Highly recommended for collectors!',
        ],
    },
];

export function PlayerReviewsSection({ className }: { className?: string }) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    React.useEffect(() => {
        if (!api) return;

        onSelect(api);
        api.on('reInit', onSelect);
        api.on('select', onSelect);

        return () => {
            api.off('reInit', onSelect);
            api.off('select', onSelect);
        };
    }, [api, onSelect]);

    return (
        <section
            className={cn('w-full py-12 sm:py-16 md:py-20', className)}
            aria-label="Player Reviews"
        >
            <div className="mx-auto max-w-[1900px] px-4 sm:px-6 xl:px-[50px]">
                {/* Title and Top Navigation */}
                <div className="mb-8 flex items-center justify-between sm:mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
                        What Our Players Said
                    </h2>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => api?.scrollPrev()}
                            disabled={!canScrollPrev}
                            aria-label="Previous reviews"
                            className="flex size-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 shadow-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 sm:size-10"
                        >
                            <ChevronLeft className="size-4 sm:size-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => api?.scrollNext()}
                            disabled={!canScrollNext}
                            aria-label="Next reviews"
                            className="flex size-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 shadow-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 sm:size-10"
                        >
                            <ChevronRight className="size-4 sm:size-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: 'start',
                        containScroll: 'trimSnaps',
                        dragFree: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4 sm:-ml-6">
                        {PLAYER_REVIEWS.map((review) => (
                            <CarouselItem
                                key={review.id}
                                className="basis-[88%] pl-4 sm:basis-[48%] lg:basis-[32%] sm:pl-6"
                            >
                                <div className="flex h-full min-h-[320px] flex-col rounded-lg bg-[#ededed] p-6 text-neutral-900 sm:min-h-[360px] sm:p-8">
                                    {/* Star Rating */}
                                    <div
                                        className="mb-4 flex items-center gap-1 text-amber-500"
                                        aria-label={`${review.rating} out of 5 stars`}
                                    >
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className="size-4 fill-amber-500 text-amber-500"
                                            />
                                        ))}
                                    </div>

                                    {/* Author */}
                                    <h3 className="mb-3 text-base font-bold text-neutral-950 sm:text-lg">
                                        {review.author}
                                    </h3>

                                    {/* Content Paragraphs */}
                                    <div className="space-y-4 text-sm leading-relaxed text-neutral-800 sm:text-base">
                                        {review.paragraphs.map((para, idx) => (
                                            <p key={idx}>{para}</p>
                                        ))}
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}

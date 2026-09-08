'use client';

import * as React from 'react';
import Image from 'next/image';
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
    imageSrc: string;
    imageAlt: string;
}

export type PlayerReviewsVariant = 'content' | 'image';

interface PlayerReviewsSectionProps {
    className?: string;
    variant: PlayerReviewsVariant;
}

const PLAYER_REVIEWS: readonly PlayerReview[] = [
    {
        id: 'review-1',
        author: 'Maximilian',
        rating: 5,
        imageSrc: '/images/games/7-wonders.jpg',
        imageAlt: 'Board game components organized for play',
        paragraphs: [
            'I was particularly impressed with the care and attention to detail Laserox show and this is evident in the design of the product, but also the individual message of thanks included and their rapid and informative response to questions. It is very clear that they sincerely care about customer satisfaction and are intending on making a quality product. I wholeheartedly support this mindset.',
            'The assembly was mostly intuitive and presented no real problems and once complete fits perfectly and looks great. Should I ever need similar organisers for other games in future, I will most definitely be looking at Laserox first.',
        ],
    },
    {
        id: 'review-2',
        author: 'Andrew',
        rating: 5,
        imageSrc: '/images/games/aeons-end.jpg',
        imageAlt: 'Aeon’s End board game setup shared by a player',
        paragraphs: [
            'Absolutely beautiful. Great design and solid workmanship. Makes setting up and breaking down the game a breeze.',
        ],
    },
    {
        id: 'review-3',
        author: 'Christopher',
        rating: 5,
        imageSrc: '/images/games/ankh-gods-of-egypt.jpg',
        imageAlt: 'Ankh: Gods of Egypt board game setup shared by a player',
        paragraphs: [
            'It is my first laserox insert, but this one is gorgeous. The small details with thematic engravings look very nice. It does take some time to put all things together, but that is part of the fun. Really like it.',
        ],
    },
    {
        id: 'review-4',
        author: 'Sarah L.',
        rating: 5,
        imageSrc: '/images/games/arkham-horror.jpg',
        imageAlt: 'Arkham Horror board game setup shared by a player',
        paragraphs: [
            'Outstanding precision and quality! All miniature compartments and token trays fit smoothly into the original game box. Premium finish throughout.',
        ],
    },
    {
        id: 'review-5',
        author: 'David M.',
        rating: 5,
        imageSrc: '/images/games/bloodborne-the-board-game.jpg',
        imageAlt: 'Bloodborne board game setup shared by a player',
        paragraphs: [
            'Top notch materials and exceptionally thoughtful packaging. Everything arrived promptly and in pristine condition. Highly recommended for collectors!',
        ],
    },
];

export function PlayerReviewsSection({
    className,
    variant,
}: PlayerReviewsSectionProps) {
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

        const timeoutId = window.setTimeout(() => onSelect(api), 0);
        api.on('reInit', onSelect);
        api.on('select', onSelect);

        return () => {
            window.clearTimeout(timeoutId);
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
                                {variant === 'image' ? (
                                    <figure className="group relative min-h-[320px] overflow-hidden rounded-lg bg-neutral-200 sm:min-h-[360px]">
                                        <Image
                                            src={review.imageSrc}
                                            alt={review.imageAlt}
                                            fill
                                            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 88vw"
                                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                        />
                                        <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent px-6 pb-6 pt-16 text-white sm:px-8 sm:pb-8">
                                            <div
                                                className="mb-2 flex items-center gap-1 text-amber-400"
                                                aria-label={`${review.rating} out of 5 stars`}
                                            >
                                                {Array.from({ length: review.rating }, (_, star) => (
                                                    <Star
                                                        key={`${review.id}-image-star-${star + 1}`}
                                                        className="size-4 fill-amber-400 text-amber-400"
                                                    />
                                                ))}
                                            </div>
                                            <h3 className="text-base font-bold sm:text-lg">
                                                {review.author}
                                            </h3>
                                        </figcaption>
                                    </figure>
                                ) : (
                                    <div className="flex h-full min-h-[320px] flex-col rounded-lg bg-[#ededed] p-6 text-neutral-900 sm:min-h-[360px] sm:p-8">
                                        {/* Star Rating */}
                                        <div
                                            className="mb-4 flex items-center gap-1 text-amber-500"
                                            aria-label={`${review.rating} out of 5 stars`}
                                        >
                                            {Array.from({ length: review.rating }, (_, star) => (
                                                <Star
                                                    key={`${review.id}-content-star-${star + 1}`}
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
                                            {review.paragraphs.map((paragraph) => (
                                                <p key={paragraph}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}

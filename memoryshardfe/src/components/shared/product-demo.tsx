import Image from 'next/image';
import { Plus, X } from 'lucide-react';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/utils/cn';

const productHotspots = [
    {
        id: 'sorted-components',
        position: { left: '53%', top: '15%' },
        side: 'bottom',
        text: 'Keep every token and component sorted in a dedicated compartment.',
    },
    {
        id: 'more-play-time',
        position: { left: '34.5%', top: '45%' },
        side: 'right',
        text: 'Better organization means more time strategizing, playing, and winning.',
    },
    {
        id: 'faster-pack-up',
        position: { left: '69.5%', top: '69%' },
        side: 'top',
        text: 'Pack the game away faster and protect every piece between sessions.',
    },
] as const;

export type ProductDemoProps = {
    className?: string;
};

export function ProductDemo({ className }: ProductDemoProps) {
    return (
        <section
            aria-label="Product organizer highlights"
            className={cn(
                'w-full bg-neutral-100 px-4 py-10 sm:px-6 sm:py-14',
                className,
            )}
        >
            <TooltipProvider delayDuration={80} skipDelayDuration={100}>
                <div className="relative mx-auto aspect-[768/704] w-full max-w-[880px]">
                    <Image
                        src="https://laserox.net/cdn/shop/files/2024-05-03T132444.466.png?v=1714735542&width=1000"
                        alt="Wooden board game organizer filled with cards, tokens, and game pieces"
                        fill
                        sizes="(max-width: 768px) 100vw, 880px"
                        className="object-contain"
                    />

                    {productHotspots.map((hotspot) => (
                        <Tooltip key={hotspot.id}>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    aria-label={`Show product detail: ${hotspot.text}`}
                                    className="group/hotspot absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-950 shadow-[0_8px_24px_rgba(15,23,42,0.22)] outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 sm:size-12 [&[data-state=delayed-open]_.hotspot-close]:block [&[data-state=delayed-open]_.hotspot-plus]:hidden [&[data-state=instant-open]_.hotspot-close]:block [&[data-state=instant-open]_.hotspot-plus]:hidden"
                                    style={hotspot.position}
                                >
                                    <Plus
                                        className="hotspot-plus size-5"
                                        aria-hidden="true"
                                    />
                                    <X
                                        className="hotspot-close hidden size-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </TooltipTrigger>

                            <TooltipContent
                                side={hotspot.side}
                                sideOffset={18}
                                collisionPadding={16}
                                className="text-sm sm:px-8 sm:py-7 sm:text-base sm:leading-7"
                            >
                                {hotspot.text}
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </TooltipProvider>
        </section>
    );
}

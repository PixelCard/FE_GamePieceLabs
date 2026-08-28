import type { CSSProperties, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/utils/cn';

export type CardImageTitleAspectRatio =
    | 'default'
    | 'portrait'
    | 'landscape';

export type CardImageTitleProps = {
    title?: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    aspectRatio?: CardImageTitleAspectRatio;
    isArrow?: boolean;
    sizes?: string;
    imagePosition?: CSSProperties['objectPosition'];
    className?: string;
    titleClassName?: string;
};

export type CardImageTitleGridProps = {
    children: ReactNode;
    className?: string;
};

const aspectRatioClasses: Record<CardImageTitleAspectRatio, string> = {
    default: 'aspect-[1.05/1]',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[2.2/1]',
};

export function CardImageTitleGrid({
    children,
    className,
}: CardImageTitleGridProps) {
    return (
        <div
            className={cn(
                'grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
                className,
            )}
        >
            {children}
        </div>
    );
}

export function CardImageTitle({
    title,
    imageSrc,
    imageAlt,
    href,
    aspectRatio = 'default',
    isArrow = true,
    sizes = '(max-width: 639px) 50vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 20vw',
    imagePosition = 'center',
    className,
    titleClassName,
}: CardImageTitleProps) {
    return (
        <Link
            href={href}
            className={cn(
                'group mx-auto block w-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4',
                className,
            )}
        >
            <Card
                className={cn(
                    'relative overflow-hidden rounded-xl border-0 bg-neutral-950 p-0 shadow-none',
                    aspectRatioClasses[aspectRatio],
                )}
            >
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes={sizes}
                    style={{ objectPosition: imagePosition }}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5 transition-colors duration-300 group-hover:from-black/90"
                />

                {title || isArrow ? (
                    <CardContent
                        className={cn(
                            'absolute inset-0 flex items-end gap-2 p-4 sm:gap-3 sm:p-5',
                            title ? 'justify-between' : 'justify-end',
                        )}
                    >
                        {title ? (
                            <span
                                className={cn(
                                    'text-sm font-bold leading-snug text-white drop-shadow-sm sm:text-lg sm:leading-tight xl:text-xl',
                                    titleClassName,
                                )}
                            >
                                {title}
                            </span>
                        ) : null}

                        {isArrow ? (
                            <span className="hidden size-6 shrink-0 translate-x-2 items-center justify-center rounded-full bg-white text-neutral-950 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:flex sm:size-8">
                                <ArrowRight
                                    className="size-3 sm:size-4"
                                    aria-hidden="true"
                                />
                            </span>
                        ) : null}
                    </CardContent>
                ) : null}
            </Card>
        </Link>
    );
}

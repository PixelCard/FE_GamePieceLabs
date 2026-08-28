import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { CardImageTitleGrid } from '@/components/shared/card-image-title';

export type CardImageTitleSectionMore = {
    label: string;
    href: string;
};

export type CardImageTitleSectionProps = {
    title: string;
    more: CardImageTitleSectionMore;
    children: ReactNode;
};

export type CardImageTitleSectionGroupProps = {
    children: ReactNode;
};

export function CardImageTitleSectionGroup({
    children,
}: CardImageTitleSectionGroupProps) {
    return <div className="mt-10 space-y-16 sm:space-y-20">{children}</div>;
}

export function CardImageTitleSection({
    title,
    more,
    children,
}: CardImageTitleSectionProps) {
    const titleId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;

    return (
        <section
            aria-labelledby={titleId}
            className="mx-auto w-full max-w-[1900px] px-4 sm:px-6 xl:px-[50px]"
        >
            <div className="mx-auto w-full sm:max-w-[620px] lg:max-w-[940px] xl:max-w-[1580px]">
                <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    <h2
                        id={titleId}
                        className="m-0 text-2xl font-bold tracking-[-0.035em] text-neutral-950 sm:text-[clamp(2rem,2.4vw,3rem)] sm:leading-none"
                    >
                        {title}
                    </h2>

                    <Link
                        href={more.href}
                        className="group inline-flex w-fit items-center gap-4 rounded-full text-base font-bold text-neutral-950 outline-none transition-colors hover:text-red-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:text-lg"
                    >
                        {more.label}
                        <span className="flex size-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors group-hover:bg-red-600 group-hover:text-white">
                            <ChevronRight
                                className="size-4"
                                aria-hidden="true"
                            />
                        </span>
                    </Link>
                </div>

                <CardImageTitleGrid>{children}</CardImageTitleGrid>
            </div>
        </section>
    );
}

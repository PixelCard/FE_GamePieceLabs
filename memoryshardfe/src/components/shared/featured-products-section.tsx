import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export type FeaturedProductsSectionMore = {
    label: string;
    href: string;
};

export type FeaturedProductsSectionProps = {
    title: string;
    more: FeaturedProductsSectionMore;
    children: ReactNode;
};

export function FeaturedProductsSection({
    title,
    more,
    children,
}: FeaturedProductsSectionProps) {
    const titleId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;

    return (
        <section
            aria-labelledby={titleId}
            className="mx-auto w-full max-w-[1900px] px-4 py-16 sm:px-6 sm:py-20 xl:px-[50px]"
        >
            <div className="mx-auto w-full max-w-[300px] sm:max-w-[620px] lg:max-w-[940px] xl:max-w-[1580px]">
                <div className="mb-10 flex items-center justify-between gap-5">
                    <h2
                        id={titleId}
                        className="m-0 text-[clamp(2rem,2.4vw,3rem)] leading-none tracking-[-0.035em] text-neutral-950"
                    >
                        {title}
                    </h2>

                    <Link
                        href={more.href}
                        className="group inline-flex shrink-0 items-center gap-3 rounded-full text-sm font-bold text-neutral-950 outline-none transition-colors hover:text-red-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:text-base"
                    >
                        {more.label}
                        <span className="flex size-7 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors group-hover:bg-red-600 group-hover:text-white">
                            <ChevronRight
                                className="size-4"
                                aria-hidden="true"
                            />
                        </span>
                    </Link>
                </div>

                {children}
            </div>
        </section>
    );
}

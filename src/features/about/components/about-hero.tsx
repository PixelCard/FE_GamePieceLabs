import type { AboutHeroContent } from "@/features/about/types/about-content";
import { ImageFrame } from "@/components/shared/image-frame";

type AboutHeroProps = {
  content: AboutHeroContent;
};

export function AboutHero({ content }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600 sm:text-base">
            {content.eyebrow}
          </p>
          <h1 className="type-h1 mt-4 text-neutral-950 dark:text-white">
            {content.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg sm:leading-relaxed dark:text-neutral-300">
            {content.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mt-12 lg:mt-16">
        <ImageFrame
          src={content.heroImageSrc}
          alt={content.heroImageAlt}
          priority
          aspectRatio="21/9"
          className="shadow-2xl"
          overlay
        />
      </div>
    </section>
  );
}

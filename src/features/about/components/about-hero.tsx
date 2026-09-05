import type { AboutHeroContent } from "@/features/about/types/about-content";
import { ImageFrame } from "@/components/shared/image-frame";

type AboutHeroProps = {
  content: AboutHeroContent;
};

export function AboutHero({ content }: AboutHeroProps) {
  return (
   <section className="relative overflow-hidden pt-2 pb-10 sm:pt-4 sm:pb-14 lg:pt-6 lg:pb-20">
      <div className="mt-4 sm:mt-8 lg:mt-3">
        <ImageFrame
          src={content.heroImageSrc}
          alt={content.heroImageAlt}
          eyebrow={content.eyebrow}
          header={content.title}
          priority
          aspectRatio="aspect-[4/3] sm:aspect-video lg:aspect-[21/9]"
          className="shadow-2xl"
          overlay
        />
      </div>
    </section>
  );
}

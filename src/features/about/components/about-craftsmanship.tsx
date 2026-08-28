import { Sparkles, CheckCircle2 } from "lucide-react";
import type { AboutCraftsmanshipSection } from "@/features/about/types/about-content";
import { ImageFrame } from "@/components/shared/image-frame";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AboutCraftsmanshipProps = {
  content: AboutCraftsmanshipSection;
};

export function AboutCraftsmanship({ content }: AboutCraftsmanshipProps) {
  return (
    <section className="bg-neutral-100/70 py-14 sm:py-18 lg:py-24 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600 sm:text-base">
            {content.eyebrow}
          </p>
          <h2 className="type-h2 mt-4 text-neutral-950 dark:text-white">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
            {content.description}
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mt-12 lg:mt-16">
        <ImageFrame
          src={content.showcaseImageSrc}
          alt={content.showcaseImageAlt}
          caption={content.showcaseCaption}
          aspectRatio="21/9"
          className="shadow-2xl"
          overlay
        />
      </div>

      <div className="mx-auto mt-12 max-w-[1440px] px-4 sm:mt-16 sm:px-6 xl:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative flex flex-col justify-between border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div>
                {feature.badge ? (
                  <Badge
                    variant="secondary"
                    className="mb-4 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400"
                  >
                    {feature.badge}
                  </Badge>
                ) : null}
                <h3 className="type-h5 text-neutral-950 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-neutral-100 text-xs font-semibold text-neutral-400 dark:border-neutral-800">
                <CheckCircle2 className="size-4 text-red-600" />
                <span>Tiêu chuẩn MemoryShard</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { AboutValuesSection } from "@/features/about/types/about-content";
import { Card } from "@/components/ui/card";

type AboutValuesProps = {
  content: AboutValuesSection;
};

export function AboutValues({ content }: AboutValuesProps) {
  return (
    <section className="py-14 sm:py-18 lg:py-24">
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

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 xl:grid-cols-4">
          {content.values.map((value) => (
            <Card
              key={value.title}
              className="group overflow-hidden border-neutral-200/80 bg-white px-5 pb-6 pt-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-red-900/50"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-neutral-100">
                <Image
                  src={value.imageSrc}  
                  alt={value.title}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <h3 className="type-h5 mt-6 text-neutral-950 dark:text-white">
                {value.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Quote } from "lucide-react";
import type { AboutStorySection } from "@/features/about/types/about-content";
import { Card } from "@/components/ui/card";

type AboutStoryProps = {
  content: AboutStorySection;
};

export function AboutStory({ content }: AboutStoryProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20 items-start">
          <div className="lg:col-span-6">
            <p className="text-sm font-bold uppercase tracking-wider text-red-600 sm:text-base">
              {content.eyebrow}
            </p>
            <h2 className="type-h2 mt-4 text-neutral-950 dark:text-white">
              {content.title}
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
              {content.lead}
            </p>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <Card className="relative overflow-hidden border-neutral-200/80 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-8 text-white shadow-xl sm:p-10 lg:p-12 dark:border-neutral-800">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 -mr-8 -mt-8 size-48 rounded-full bg-red-600/10 blur-3xl pointer-events-none"
              />
              <Quote
                className="size-10 text-red-500/60 mb-6"
                aria-hidden="true"
              />
              <blockquote className="text-xl font-semibold leading-snug tracking-tight text-neutral-100 sm:text-2xl sm:leading-snug">
                &ldquo;{content.quote.text}&rdquo;
              </blockquote>
              <div className="mt-8 border-t border-neutral-800 pt-6">
                <div className="font-bold text-white">
                  {content.quote.author}
                </div>
                <div className="text-sm text-neutral-400">
                  {content.quote.role}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

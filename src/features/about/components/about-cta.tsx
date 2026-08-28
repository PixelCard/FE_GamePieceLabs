import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AboutCtaSection } from "@/features/about/types/about-content";
import { Button } from "@/components/ui/button";

type AboutCtaProps = {
  content: AboutCtaSection;
};

export function AboutCta({ content }: AboutCtaProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black px-6 py-14 text-center text-white shadow-2xl sm:px-12 sm:py-20 lg:px-20">
          <div
            aria-hidden="true"
            className="absolute -top-24 -left-24 size-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 size-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="type-h1 text-white drop-shadow-sm">
              {content.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg sm:leading-relaxed">
              {content.description}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-red-600 px-8 text-base font-bold text-white shadow-lg hover:bg-red-700 w-full sm:w-auto"
              >
                <Link
                  href={content.primaryAction.href}
                  className="inline-flex items-center gap-2"
                >
                  <span>{content.primaryAction.label}</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-full border-neutral-700 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10 w-full sm:w-auto"
              >
                <Link href={content.secondaryAction.href}>
                  {content.secondaryAction.label}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

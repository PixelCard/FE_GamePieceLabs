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
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white px-6 py-14 text-center text-neutral-950 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:px-12 sm:py-20 lg:px-20">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="type-h1 text-neutral-950">
              {content.title}
            </h2>
            <p className="type-prose mt-6 text-base text-neutral-600 sm:text-lg">
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
                className="h-14 w-full rounded-full border-neutral-300 bg-white px-8 text-base font-bold text-neutral-950 hover:bg-neutral-50 sm:w-auto"
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

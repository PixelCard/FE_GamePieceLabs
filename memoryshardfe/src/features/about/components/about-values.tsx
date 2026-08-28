import {
  Sparkles,
  Leaf,
  Users,
  ShieldCheck,
  Hammer,
  Compass,
  type LucideIcon,
} from "lucide-react";
import type {
  AboutValuesSection,
  AboutCoreValue,
} from "@/features/about/types/about-content";
import { Card } from "@/components/ui/card";

const valueIcons: Record<AboutCoreValue["icon"], LucideIcon> = {
  sparkles: Sparkles,
  leaf: Leaf,
  users: Users,
  "shield-check": ShieldCheck,
  hammer: Hammer,
  compass: Compass,
};

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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
          {content.values.map((value) => {
            const Icon = valueIcons[value.icon] || Sparkles;

            return (
              <Card
                key={value.title}
                className="group relative overflow-hidden border-neutral-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-red-900/50"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-950 transition-colors group-hover:bg-red-600 group-hover:text-white dark:bg-neutral-900 dark:text-white">
                  <Icon className="size-6" />
                </div>
                <h3 className="type-h5 mt-6 text-neutral-950 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {value.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

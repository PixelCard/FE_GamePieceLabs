import type { AboutStatsSection } from "@/features/about/types/about-content";

type AboutStatsProps = {
  content: AboutStatsSection;
};

export function AboutStats({ content }: AboutStatsProps) {
  return (
    <section className="bg-neutral-950 py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-8">
        <h2 className="sr-only">{content.title}</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {content.items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center sm:items-start sm:text-left border-l-0 sm:border-l sm:border-neutral-800 sm:pl-6"
            >
              <div className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {item.value}
              </div>
              <div className="mt-2 text-base font-bold text-neutral-200 sm:text-lg">
                {item.label}
              </div>
              {item.description ? (
                <div className="mt-1 text-sm text-neutral-400">
                  {item.description}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

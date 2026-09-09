import type { AboutStatsSection } from "@/features/about/types/about-content";

type AboutStatsProps = {
  content: AboutStatsSection;
};

export function AboutStats({ content }: AboutStatsProps) {
  return (
    <section className="border-y border-neutral-200 bg-white py-16 text-neutral-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-8">
        <h2 className="sr-only">{content.title}</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {content.items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center border-l-0 text-center sm:items-start sm:border-l sm:border-neutral-200 sm:pl-6 sm:text-left"
            >
              <div className="text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
                {item.value}
              </div>
              <div className="mt-2 text-base font-bold text-neutral-800 sm:text-lg">
                {item.label}
              </div>
              {item.description ? (
                <div className="mt-1 text-sm text-neutral-600">
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

import type { AboutCraftsmanshipSection } from "@/features/about/types/about-content";
import { VideoFrame } from "@/components/shared/video-frame";

type AboutCraftsmanshipProps = {
  content: AboutCraftsmanshipSection;
};

export function AboutCraftsmanship({ content }: AboutCraftsmanshipProps) {
  return (
    <section className="bg-neutral-100/70 py-12 sm:py-16 lg:py-20 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-[1560px] px-4 sm:px-6 xl:px-10">
        <div className="overflow-hidden rounded-[26px] border border-neutral-200/80 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] dark:border-neutral-800 dark:bg-neutral-950">
          <div className="grid items-stretch lg:grid-cols-[minmax(0,1.18fr)_minmax(340px,0.82fr)]">
            <div className="h-full">
              <VideoFrame
                type={content.showcaseVideo.type}
                src={content.showcaseVideo.src}
                title={content.showcaseVideo.title}
              />
            </div>

            <div className="flex items-center justify-center border-t border-neutral-200/70 px-5 py-8 sm:px-8 sm:py-9 lg:border-t-0 lg:border-l lg:px-9 lg:py-10 dark:border-neutral-800">
              <div className="mx-auto max-w-[35rem] text-center">
                <p className="text-xs font-semibold tracking-[0.08em] text-neutral-500 sm:text-sm dark:text-neutral-400">
                  {content.eyebrow}
                </p>

                <h2 className="mt-3 text-balance text-[1.9rem] font-bold leading-[1.08] tracking-[-0.04em] text-neutral-950 sm:text-[2.35rem] lg:text-[3rem] dark:text-white">
                  {content.title}
                </h2>

                <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-[15px] sm:leading-7 dark:text-neutral-300">
                  {content.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

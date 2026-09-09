import type { AboutCraftsmanshipSection } from "@/features/about/types/about-content";
import { VideoFrame } from "@/components/shared/video-frame";

type AboutCraftsmanshipProps = {
  content: AboutCraftsmanshipSection;
};

export function AboutCraftsmanship({ content }: AboutCraftsmanshipProps) {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1560px] px-4 sm:px-6 xl:px-10">
        <div className="overflow-hidden rounded-[26px] border border-neutral-200/80 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
          <div className="grid items-stretch lg:grid-cols-[minmax(0,1.18fr)_minmax(340px,0.82fr)]">
            <div className="h-full">
              <VideoFrame
                type={content.showcaseVideo.type}
                src={content.showcaseVideo.src}
                title={content.showcaseVideo.title}
              />
            </div>

            <div className="flex items-center justify-center border-t border-neutral-200/70 px-5 py-8 sm:px-8 sm:py-9 lg:border-t-0 lg:border-l lg:px-9 lg:py-10">
              <div className="mx-auto max-w-[35rem] text-center">
                <p className="type-eyebrow text-neutral-500">
                  {content.eyebrow}
                </p>

                <h2 className="type-h2 mt-3 text-neutral-950">
                  {content.title}
                </h2>

                <p className="type-prose mt-4 text-base text-neutral-600">
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

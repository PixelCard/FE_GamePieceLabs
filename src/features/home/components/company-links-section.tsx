import { CardImageTitle } from '@/components/shared/card-image-title';
import { companyLinks } from '@/features/home/data/company-links';

const fullWidthSizes =
    '(max-width: 1023px) calc(100vw - 2rem), (max-width: 1279px) 50vw, 790px';
const halfWidthSizes =
    '(max-width: 1023px) calc(50vw - 1.5rem), (max-width: 1279px) 25vw, 385px';

export function CompanyLinksSection() {
    return (
        <section
            aria-labelledby="company-links-title"
            className="bg-white py-12 sm:py-16 xl:py-20 dark:bg-neutral-950"
        >
            <h2 id="company-links-title" className="sr-only">
                Explore GamePieceLabs
            </h2>

            <div className="mx-auto w-full max-w-[1900px] px-4 sm:px-6 xl:px-[50px]">
                <div className="mx-auto grid w-full gap-3 sm:max-w-[620px] sm:gap-5 lg:max-w-[940px] lg:grid-cols-2 xl:max-w-[1580px]">
                    <CardImageTitle
                        {...companyLinks.about}
                        isArrow={false}
                        sizes={fullWidthSizes}
                        titleClassName="sm:text-2xl lg:text-3xl xl:text-4xl"
                    />

                    <div className="grid grid-cols-2 gap-3 sm:gap-5">
                        <CardImageTitle
                            {...companyLinks.materials}
                            isArrow={false}
                            sizes={halfWidthSizes}
                        />
                        <CardImageTitle
                            {...companyLinks.sustainability}
                            isArrow={false}
                            sizes={halfWidthSizes}
                        />
                        <CardImageTitle
                            {...companyLinks.contact}
                            aspectRatio="landscape"
                            isArrow={false}
                            sizes={fullWidthSizes}
                            className="col-span-2"
                            titleClassName="sm:text-2xl xl:text-3xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

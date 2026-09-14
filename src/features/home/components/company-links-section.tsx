import { CardImageTitle } from "@/components/shared/card-image-title";
import { companyLinks } from "@/features/home/data/company-links";
import { cn } from "@/utils/cn";

const fullWidthSizes =
  "(max-width: 1023px) calc(100vw - 2rem), (max-width: 1279px) 50vw, 790px";
const halfWidthSizes =
  "(max-width: 1024px) calc(50vw - 1.5rem), (max-width: 1279px) 25vw, 385px";

type CompanyLinksSectionProps = {
  className?: string;
};

export function CompanyLinksSection({
  className,
}: CompanyLinksSectionProps) {
  return (
    <div className={cn("w-full bg-white", className)}>
      <div className="mx-auto grid w-full gap-3 sm:gap-5 lg:grid-cols-2">
          <CardImageTitle
            {...companyLinks.about}
            isArrow={false}
            sizes={fullWidthSizes}
            className="[&>[data-slot=card]]:aspect-[6/5]"
            titleClassName="sm:text-2xl lg:text-3xl xl:text-4xl"
            isClicked={true}
          />

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <CardImageTitle
              {...companyLinks.materials}
              isArrow={false}
              sizes={halfWidthSizes}
              className="[&>[data-slot=card]]:aspect-[6/5]"
              isClicked={true}
            />
            <CardImageTitle
              {...companyLinks.sustainability}
              isArrow={false}
              sizes={halfWidthSizes}
              className="[&>[data-slot=card]]:aspect-[6/5]"
              isClicked={true}
            />
            <CardImageTitle
              {...companyLinks.contact}
              aspectRatio="landscape"
              isArrow={false}
              sizes={fullWidthSizes}
              className="col-span-2 [&>[data-slot=card]]:aspect-[5/2]"
              titleClassName="sm:text-2xl xl:text-3xl"
              isClicked={true}
            />
          </div>
      </div>
    </div>
  );
}

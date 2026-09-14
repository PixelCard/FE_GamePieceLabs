import {
  CardImageTitle,
  CardImageTitleGrid,
} from "@/components/shared/card-image-title";
import { upcomingProducts } from "@/features/home/data/upcoming-products";

const upcomingProductSizes =
  "(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2.5rem), 380px";

type UpcomingProductsSectionProps = {
  hideTitle?: boolean;
};

export function UpcomingProductsSection({
  hideTitle = false,
}: UpcomingProductsSectionProps) {
  return (
    <div className="mx-auto max-w-[1350px]">
      {hideTitle ? null : (
        <h2 className="type-h2 mb-8 text-center text-neutral-950 sm:mb-10">
          Upcoming Products
        </h2>
      )}

      <CardImageTitleGrid className="grid-cols-1 justify-items-center gap-10 px-15 sm:grid-cols-2 sm:gap-10 sm:px-15 lg:grid-cols-3 xl:grid-cols-3 xl:gap-y-15">
        {upcomingProducts.map(({ id, ...product }) => (
          <CardImageTitle
            key={id}
            {...product}
            aspectRatio="square"
            isArrow={false}
            sizes={upcomingProductSizes}
            className="sm:max-w-[400px]"
            isClicked={false}
          />
        ))}
      </CardImageTitleGrid>
    </div>
  );
}

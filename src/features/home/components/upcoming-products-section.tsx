import {
    CardImageTitle,
    CardImageTitleGrid,
} from '@/components/shared/card-image-title';
import { upcomingProducts } from '@/features/home/data/upcoming-products';

const upcomingProductSizes =
    '(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2.5rem), 380px';

export function UpcomingProductsSection() {
    return (
        <section
            aria-labelledby="upcoming-products-title"
            className="py-12 sm:py-16 xl:py-20"
        >
            <div className="mx-auto max-w-[1350px]">
                <div className="">
                    <h2
                        id="upcoming-products-title"
                        className="mb-8 text-center text-3xl font-bold tracking-[-0.035em] text-neutral-950 sm:mb-10 sm:text-[clamp(2rem,2.4vw,3rem)] sm:leading-none"
                    >
                        Upcoming Products
                    </h2>

                    <CardImageTitleGrid className="grid-cols-1 justify-items-center px-15 gap-10 sm:grid-cols-2 sm:px-15 sm:gap-10 lg:grid-cols-3 xl:grid-cols-3 xl:gap-y-15">
                        {upcomingProducts.map(({ id, ...product }) => (
                            <CardImageTitle
                                key={id}
                                {...product}
                                aspectRatio="square"
                                isArrow={false}
                                className="sm:max-w-[400px]"
                            />
                        ))}
                    </CardImageTitleGrid>
                </div>
            </div>
        </section>
    );
}

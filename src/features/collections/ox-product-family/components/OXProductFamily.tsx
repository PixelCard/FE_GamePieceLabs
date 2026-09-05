import { CardImageTitle } from "@/components/shared/card-image-title";
import Filter from "@/components/shared/filter";
import { ImageFrame } from "@/components/shared/image-frame";
import { ProductList } from "@/components/shared/product-list";
import { SectionTitle } from "@/components/shared/section-title";
import Wrapper from "@/components/shared/wrapper";
import { CollectionsPageData } from "../types/ox-product-family";
import { MarqueeText } from "@/components/shared/marquee-text";

interface OXProductFamilyProps {
  data: CollectionsPageData;
}

export function OXProductFamily({ data }: OXProductFamilyProps) {
  const { hero, editorial, products, otherCategories } = data;

  return (
    <>
      <ImageFrame
        src={hero.imageSrc}
        alt={hero.imageAlt}
        header={hero.header}
        description={hero.description}
        headerSize="h1"
        textAlign="left"
        priority
        aspectRatio="aspect-[4/3] sm:aspect-[16/7] lg:aspect-[22/5]"
        sizes="100vw"
        containerClassName="w-full max-w-none sm:w-full xl:w-full"
        className="rounded-none border-0 shadow-none sm:rounded-none"
        imageClassName="object-center"
      />

      <Wrapper>
        <div className="flex w-full items-start py-3">
          <div className="flex-1 text-left">
            <Filter
              variant="switch"
              label="In stock only"
              activeLabel="In Stock"
              defaultChecked={false}
              labelPosition="left"
              showActiveBadge
            />
          </div>

          <div className="flex flex-1 items-start justify-center gap-2 text-center">
            <Filter
              items={[{ id: "accessories", label: "Accessories", count: 4 }]}
              title="Product"
              variant="type"
            />
            <Filter variant="price" min={0} max={274} step={1} currency="USD" />
          </div>

          <div className="flex-1 text-right">
            <Filter
              variant="sort"
              items={[
                "featured",
                "most relevant",
                "best selling",
                "alphabetically, a-z",
                "alphabetically, z-a",
                "price, low to high",
                "price, high to low",
                "date, old to new",
                "date, new to old",
              ]}
            />
          </div>
        </div>

        <section className="pt-8" aria-labelledby="collection-products-heading">
          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 id="collection-products-heading" className="sr-only">
              Board game inserts
            </h2>
            <p className="text-sm text-neutral-600">
              {products.pagination.totalItems} products
            </p>
          </div>

          <ProductList
            isShowed={false}
            products={products.data}
            columns={4}
            alignPagination="center"
            pagination={products.pagination}
            variantPagination="default"
          />
        </section>
      </Wrapper>

      <MarqueeText
        title="Mastery is a never-ending exploration"
        speed={50}
        fontSize="text-8xl"
      />

      <SectionTitle
        content="split"
        image={{ src: editorial.imageSrc, alt: editorial.imageAlt }}
        className="pb-10"
      >
        <div className="flex max-w-xl flex-col items-center text-center">
          <ImageFrame
            src={editorial.emblemSrc}
            alt={editorial.emblemAlt}
            aspectRatio="aspect-square"
            objectFit="contain"
            sizes="48px"
            containerClassName="w-12 max-w-none sm:w-12 xl:w-12"
            className="rounded-none border-0 bg-transparent shadow-none sm:rounded-none"
          />

          <h2 className="mt-7 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            {editorial.heading}
          </h2>
          <p className="mt-6 text-sm leading-6 text-neutral-700 sm:text-base sm:leading-7">
            {editorial.description}
          </p>
        </div>
      </SectionTitle>

      <SectionTitle
        title="Explore Other Categories"
        more={{ label: "view all categories", href: "#" }}
        className="pb-16 sm:pb-20"
      >
        {otherCategories.map((category) => (
          <CardImageTitle key={category.href} {...category} />
        ))}
      </SectionTitle>
    </>
  );
}

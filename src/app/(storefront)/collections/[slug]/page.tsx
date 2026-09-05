import Filter from "@/components/shared/filter";
import { ImageFrame } from "@/components/shared/image-frame";
import type { PaginationMeta } from "@/components/shared/pagination";
import { ProductList } from "@/components/shared/product-list";
import type { ProductCardProps } from "@/components/shared/product-card";
import { SectionTitle } from "@/components/shared/section-title";
import Wrapper from "@/components/shared/wrapper";

const collectionHero = {
  header: "Board Game Inserts",
  description:
    "Explore our range of game-specific, laser-cut organizers, crafted to enhance your gaming experience by supporting both setup and storage. Choose the perfect gear for your next game night from our ever-expanding inventory!",
  imageSrc:
    "https://laserox.net/cdn/shop/files/MH40S2_StillLife-GuitarStore_2016_1.jpg_2.png?v=1715757791&width=1800",
  imageAlt: "Wooden board game inserts arranged on a gaming table",
} as const;

const collectionEditorial = {
  imageSrc:
    "https://laserox.net/cdn/shop/collections/boardgameinsert.webp?v=1718870186&width=1200",
  imageAlt: "Wooden board game organizer filled with cards and tokens",
  emblemSrc:
    "https://laserox.net/cdn/shop/files/emblem_black.png?v=1730107069&width=271",
  emblemAlt: "Laserox emblem",
  heading: "Clear Space, Clear Strategy",
  description:
    "Discover our line of expertly crafted game organizers, designed with three core principles in mind: efficient storage, speedy setup and teardown, and in-game support. Each organizer is designed to perfectly follow the theme of your favorite board games. Made from sustainably sourced birch plywood and precision-cut by laser, our organizers are built to last a lifetime, enhancing every game night with seamless organization.",
} as const;

const boardGameInsertsProducts = {
  data: [
    {
      slug: "gloomhaven-buttons-bugs-organizer",
      gui: "a3f1c2d4-7b8e-4a9d-9c0f-1e2d3c4b5a61",
      name: "Gloomhaven Buttons & Bugs Organizer",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LGBB-5.jpg?v=1727173076&width=1200",
      imageAlt: "Wooden organizer for Gloomhaven Buttons and Bugs",
      price: 283500,
      currency: "VND",
      rating: 4.9,
    },
    {
      slug: "spirit-organizer",
      gui: "b4e2d3c5-8f9a-4b0e-a1d2-2f3e4d5c6b72",
      name: "Spirit Organizer",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LSID_comp.jpg?v=1717751144&width=1200",
      imageAlt: "Wooden organizer trays for Spirit Island",
      price: 935750,
      currency: "VND",
      rating: 4.5,
    },
    {
      slug: "seti-organizer",
      gui: "c5f3e4d6-9a0b-4c1f-b2e3-3a4f5e6d7c83",
      name: "SETI Organizer",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LSET-hero-2.png?v=1733236650&width=1200",
      imageAlt: "Wooden organizer filled with SETI board game components",
      price: 1166000,
      currency: "VND",
      rating: 4.7,
    },
    {
      slug: "spirit-island-expansion-organizer-v2",
      gui: "d6a4f5e7-0b1c-4d2a-83f4-4b5a6f7e8d94",
      name: "Spirit Island Expansion Organizer V2",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LSIDE3-4.jpg?v=1738682122&width=1200",
      imageAlt: "Spirit Island expansion organizer with cards and tokens",
      price: 945000,
      currency: "VND",
      rating: 2,
    },
    {
      slug: "wyrmspan-organizer",
      gui: "e7b5a6f8-1c2d-4e3b-94a5-5c6b7a8f9e05",
      name: "Wyrmspan Organizer",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LWYM-hero-1_90b7e93a-cebd-44d8-84c5-1c1efe0d741d.jpg?v=1718819267&width=1200",
      imageAlt: "Wooden organizer for Wyrmspan cards and components",
      price: 961400,
      currency: "VND",
      rating: 5,
    },
    {
      slug: "quacks-organizer",
      gui: "f8c6b7a9-2d3e-4f4c-a5b6-6d7c8b9a0f16",
      name: "Quacks Organizer",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LQOQ-24.jpg?v=1718818978&width=1200",
      imageAlt: "Wooden organizer for The Quacks of Quedlinburg",
      price: 1007250,
      currency: "VND",
      rating: 4.9,
    },
    {
      slug: "white-castle-organizer",
      gui: "09d7c8ba-3e4f-405d-b6c7-7e8f9a0b1c27",
      name: "White Castle Organizer",
      imageSrc:
        "https://laserox.net/cdn/shop/files/DSC02475.jpg?v=1717753320&width=1200",
      imageAlt: "Wooden insert trays for The White Castle board game",
      price: 595000,
      currency: "VND",
      rating: 4.8,
    },
    {
      slug: "frostbox-monster-box-version",
      gui: "1ae8d9cb-4f50-416e-c7d8-8f9a0b1c2d38",
      name: "FrostBox - Monster Box Version",
      imageSrc:
        "https://laserox.net/cdn/shop/files/01-3-800x800.jpg?v=1721301433&width=1200",
      imageAlt: "Large wooden monster storage box for Frosthaven",
      price: 3175000,
      currency: "VND",
      rating: 4.6,
    },
    {
      slug: "gloomhaven-jaws-of-the-lion-organizer",
      gui: "2bf9eadc-5061-427f-d8e9-9a0b1c2d3e49",
      name: "Jaws of the Lion Organizer",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LJOTL-9837_compressed.jpg?v=1718817256&width=1200",
      imageAlt: "Wooden organizer for Gloomhaven Jaws of the Lion",
      price: 1020000,
      currency: "VND",
      rating: 4.9,
    },
    {
      slug: "dune-imperium-uprising-organizer",
      gui: "3c0afbed-6172-438a-e9f0-0b1c2d3e4f5a",
      name: "Dune Imperium Uprising Organizer",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LDNIUP-hero1.png?v=1749020330&width=1200",
      imageAlt: "Wooden organizer for Dune Imperium Uprising",
      price: 1105000,
      currency: "VND",
      rating: 5,
    },
    {
      slug: "spirit-crate-v2-1",
      gui: "4d1b0cfe-7283-449b-f0a1-1c2d3e4f5a6b",
      name: "Spirit Crate V2",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LSIDBB2-4.png?v=1731068528&width=1200",
      imageAlt: "Decorative wooden storage crate for Spirit Island",
      price: 1474000,
      currency: "VND",
      rating: 0,
    },
    {
      slug: "witcher-organizer",
      gui: "5e2c1d0f-8394-45ac-a1b2-2d3e4f5a6b7c",
      name: "Witcher Organizer",
      imageSrc:
        "https://laserox.net/cdn/shop/files/01_20_6_ce6bd863-9fdf-4a93-a2c9-3642adf671c1.jpg?v=1718819239&width=1200",
      imageAlt: "Wooden organizer for The Witcher Old World",
      price: 1814000,
      currency: "VND",
      rating: 4.4,
    },
  ],
  pagination: {
    currentPage: 1,
    pageSize: 12,
    totalItems: 281,
    totalPages: 24,
    hasNext: true,
    hasPrevious: false,
  },
} as const satisfies {
  data: readonly ProductCardProps[];
  pagination: PaginationMeta;
};

export default function CollectionPage() {
  return (
    <>
      <ImageFrame
        src={collectionHero.imageSrc}
        alt={collectionHero.imageAlt}
        header={collectionHero.header}
        description={collectionHero.description}
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
              items={[
                { id: "accessories", label: "Accessories", count: 1 },
                { id: "divider", label: "Divider", count: 4 },
                { id: "insert", label: "Insert", count: 276 },
              ]}
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

        <section
          className="pt-8"
          aria-labelledby="collection-products-heading"
        >
          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 id="collection-products-heading" className="sr-only">
              Board game inserts
            </h2>
            <p className="text-sm text-neutral-600">
              {boardGameInsertsProducts.pagination.totalItems} products
            </p>
          </div>

          <ProductList
            products={boardGameInsertsProducts.data}
            columns={4}
            alignPagination="center"
            pagination={boardGameInsertsProducts.pagination}
            variantPagination="default"
          />
        </section>
      </Wrapper>

      <SectionTitle
        content="split"
        image={{
          src: collectionEditorial.imageSrc,
          alt: collectionEditorial.imageAlt,
        }}
        className="pb-5"
      >
        <div className="flex max-w-xl flex-col items-center text-center">
          <ImageFrame
            src={collectionEditorial.emblemSrc}
            alt={collectionEditorial.emblemAlt}
            aspectRatio="aspect-square"
            objectFit="contain"
            sizes="48px"
            containerClassName="w-12 max-w-none sm:w-12 xl:w-12"
            className="rounded-none border-0 bg-transparent shadow-none sm:rounded-none"
          />

          <h2 className="mt-7 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            {collectionEditorial.heading}
          </h2>
          <p className="mt-6 text-sm leading-6 text-neutral-700 sm:text-base sm:leading-7">
            {collectionEditorial.description}
          </p>
        </div>
      </SectionTitle>
    </>
  );
}

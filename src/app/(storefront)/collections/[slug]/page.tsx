import Filter from "@/components/shared/filter";
import { ImageFrame } from "@/components/shared/image-frame";
import Wrapper from "@/components/shared/wrapper";

const collectionHero = {
  header: "Board Game Inserts",
  description:
    "Explore our range of game-specific, laser-cut organizers, crafted to enhance your gaming experience by supporting both setup and storage. Choose the perfect gear for your next game night from our ever-expanding inventory!",
  imageSrc:
    "https://laserox.net/cdn/shop/files/MH40S2_StillLife-GuitarStore_2016_1.jpg_2.png?v=1715757791&width=1800",
  imageAlt: "Wooden board game inserts arranged on a gaming table",
} as const;

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
      </Wrapper>
    </>
  );
}

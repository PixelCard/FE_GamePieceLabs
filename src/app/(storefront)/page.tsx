"use client";

import Link from "next/link";

import { CardImageTitle } from "@/components/shared/card-image-title";
import { MarqueeText } from "@/components/shared/marquee-text";
import { featuredProducts } from "@/features/home/data/featured-products";
import { gameCategories } from "@/features/home/data/game-categories";
import { gearCategories } from "@/features/home/data/gear-categories";
import {
  playerReviewContentList,
  playerReviewImageList,
} from "@/features/home/data/player-reviews";
import { VideoFrame } from "@/components/shared/video-frame";
import { PlayerReviewsSection } from "@/components/shared/player-reviews-section";
import { CompanyLinksSection } from "@/features/home/components/company-links-section";
import { UpcomingProductsSection } from "@/features/home/components/upcoming-products-section";
import { OrderInstruction } from "@/features/home/components/order-instruction";
import {
  SectionTitle,
  SectionTitleGroupProps,
} from "@/components/shared/section-title";
import {
  ImageSlider,
  ImageSliderSlide,
} from "@/components/shared/image/image-slider";
import { ImageComparison } from "@/components/shared/image/image-comparision";
import { ProductGallery } from "@/components/shared/product/product-gallery";
import { Button } from "@/components/ui/button";
import { ProductDemo } from "@/features/home/components/product-demo";

const imageSliderSlides = [
  {
    id: "new-arrivals",
    title: "Bộ sưu tập mô hình mới đang mở bán",
    ctaLabel: "Xem bộ sưu tập",
    ctaHref: "/",
    imageSrc: "/images/legacy/banner1.jpg",
    imageAlt: "Banner bộ sưu tập mới",
  },
  {
    id: "preorders",
    title: "Đặt trước những mẫu figure nổi bật trước khi cháy hàng",
    ctaLabel: "Đặt trước ngay",
    ctaHref: "/",
    imageSrc: "/images/legacy/banner2.jpg",
    imageAlt: "Banner sản phẩm đặt trước",
  },
  {
    id: "featured-display",
    title: "Góc trưng bày dành cho người sưu tầm thật sự",
    ctaLabel: "Xem sản phẩm nổi bật",
    ctaHref: "/",
    imageSrc: "/images/legacy/banner3.jpg",
    imageAlt: "Banner sản phẩm nổi bật",
  },
] as const satisfies readonly ImageSliderSlide[];

export default function StorefrontHomePage() {
  return (
    <main className="bg-white">
      {/* Image slider */}
      <div className="pt-6 sm:pt-8">
        <div className="mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] sm:max-w-[620px] lg:max-w-[940px] xl:w-[calc(100%-100px)] xl:max-w-[1580px]">
          <ImageSlider
            slides={imageSliderSlides}
            autoplay
            autoplayInterval={5000}
            ariaLabel="Bộ sưu tập nổi bật"
          />
        </div>
      </div>

      <SectionTitleGroupProps>
        <SectionTitle
          title="Choose Your Gear"
          more={{
            label: "Browse all categories",
            href: "/products",
          }}
        >
          {gearCategories.map((category) => (
            <CardImageTitle
              key={category.title}
              {...category}
              prefix="/collections"
              isClicked={true}
            />
          ))}
        </SectionTitle>
      </SectionTitleGroupProps>

      <MarqueeText
        title="Mastery is a never-ending exploration"
        speed={30}
        fontSize="text-8xl"
      />

      <SectionTitle
        title="Maximize Your Game Time"
        orientation="vertical"
        align="center"
        content="split"
      >
        <div className="mb-8 space-y-3 text-center sm:mb-10 sm:space-y-4">
          <p className="text-sm font-bold tracking-[0.12em] text-red-600 uppercase sm:text-base">
            Clear Space, Clear Strategy
          </p>

          <p className="mx-auto max-w-3xl text-pretty text-base leading-relaxed font-semibold text-neutral-700 sm:text-lg">
            We all know the frustration of wasting hours of precious game time
            on game setup and teardown. With Laserox, you can set up in a snap
            and stay organized, no matter how complex the campaign gets.
          </p>
        </div>

        <ImageComparison
          imageOne="https://laserox.net/cdn/shop/files/Picture_201509_MH40S5_marbletableplant_2_jpg.png?v=1714735329&width=1000"
          imageTwo="https://laserox.net/cdn/shop/files/2024-05-03T132444.466.png?v=1714735542&width=1000"
        />
      </SectionTitle>

      <div className="py-16 sm:py-20">
        <SectionTitle
          title="Featured Products"
          more={{ label: "View all", href: "/products" }}
        >
          <div className="col-span-full">
            <ProductGallery type="featured" images={featuredProducts} />
          </div>
        </SectionTitle>
      </div>

      <SectionTitle
        orientation="vertical"
        align="center"
        content="split"
        ariaLabel="The Game Piece Labs philosophy"
        className="overflow-hidden"
      >
        <div className="flex flex-col items-center text-center">
          <h2 className="bg-gradient-to-b from-neutral-300 to-white bg-clip-text text-[clamp(2.25rem,9.5vw,15rem)] leading-[1.2] font-black tracking-[-0.065em] whitespace-nowrap text-transparent">
            GAME PIECE LABS
          </h2>

          <div className="mt-14 flex max-w-5xl flex-col items-center sm:mt-20">
            <h3 className="text-2xl leading-tight font-bold text-balance text-neutral-950 sm:text-3xl lg:text-4xl">
              From Our Table to Yours:
              <br />
              The Game Piece Labs Philosophy
            </h3>

            <p className="mt-7 max-w-4xl text-base leading-relaxed font-medium text-pretty text-neutral-700 sm:mt-9 sm:text-lg lg:text-xl">
              We believe that the best gaming experiences are born from
              hassle-free setups and crystal-clear organization. We craft our
              organizers and accessories with precision and passion, using
              eco-friendly, hand-selected, premium materials. Prepare to
              transform how you play!
            </p>

            <Button
              asChild
              className="mt-8 h-14 rounded-full bg-neutral-950 px-10 text-base font-bold text-white hover:bg-neutral-800 focus-visible:ring-neutral-950 sm:mt-10 sm:h-16 sm:px-12 sm:text-lg"
            >
              <Link href="/about">Discover more</Link>
            </Button>
          </div>
        </div>
      </SectionTitle>

      {/* 
      <VideoFrame
        type="youtube"
        src="https://www.youtube.com/embed/HjsGUuQsQOY?si=ZcxnS0Ln7VPw4BqD"
      /> */}

      <SectionTitleGroupProps>
        <SectionTitle
          title="Browse By Game"
          more={{
            label: "View all games",
            href: "/products",
          }}
          align="left"
        >
          {gameCategories.map((game) => (
            <CardImageTitle key={game.title} {...game} prefix="/collections" />
          ))}
        </SectionTitle>
      </SectionTitleGroupProps>

      <PlayerReviewsSection
        variant="image"
        imageList={playerReviewImageList}
        contentList={playerReviewContentList}
      />

      <OrderInstruction />

      <CompanyLinksSection />

      <UpcomingProductsSection />
    </main>
  );
}

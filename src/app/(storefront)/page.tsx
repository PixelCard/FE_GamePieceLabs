"use client";
import { CardImageTitle } from "@/components/shared/card-image-title";
import { ProductGallery } from "@/components/shared/product-gallery";
import {
  ImageSlider,
  type ImageSliderSlide,
} from "@/components/shared/image-slider";
import { MarqueeText } from "@/components/shared/marquee-text";
import { featuredProducts } from "@/features/home/data/featured-products";
import { gameCategories } from "@/features/home/data/game-categories";
import { gearCategories } from "@/features/home/data/gear-categories";
import { ImageComparison } from "@/components/shared/image-comparision";
import { ProductDemo } from "@/components/shared/product-demo";
import { VideoFrame } from "@/components/shared/video-frame";
import { PlayerReviewsSection } from "@/components/shared/player-reviews-section";
import { CompanyLinksSection } from "@/features/home/components/company-links-section";
import { UpcomingProductsSection } from "@/features/home/components/upcoming-products-section";
import {
  SectionTitle,
  SectionTitleGroupProps,
} from "@/components/shared/section-title";

const imageSliderSlides = [
  {
    id: "new-arrivals",
    title: "Bộ sưu tập mô hình mới đang mở bán",
    subtitle:
      "Khám phá các mẫu figure, mecha và phụ kiện mới nhất vừa cập bến tại MemoryShard.",
    ctaLabel: "Xem bộ sưu tập",
    ctaHref: "/",
    imageSrc: "/images/legacy/banner1.jpg",
    badge: "Mới về",
    imageAlt: "Banner bộ sưu tập mới",
  },
  {
    id: "preorders",
    title: "Đặt trước những mẫu figure nổi bật trước khi cháy hàng",
    subtitle:
      "Theo dõi các đợt mở bán được săn đón nhiều nhất và giữ chỗ sớm cho góc trưng bày của bạn.",
    ctaLabel: "Đặt trước ngay",
    ctaHref: "/",
    imageSrc: "/images/legacy/banner2.jpg",
    badge: "Đặt trước",
    imageAlt: "Banner sản phẩm đặt trước",
  },
  {
    id: "featured-display",
    title: "Góc trưng bày dành cho người sưu tầm thật sự",
    subtitle:
      "Từ scale figure nổi bật đến phụ kiện hoàn thiện setup, mọi thứ bạn cần đều đang có mặt tại đây.",
    ctaLabel: "Xem sản phẩm nổi bật",
    ctaHref: "/",
    imageSrc: "/images/legacy/banner3.jpg",
    badge: "Nổi bật",
    imageAlt: "Banner sản phẩm nổi bật",
  },
] as const satisfies readonly ImageSliderSlide[];

export default function StorefrontHomePage() {
  return (
    <main className="bg-neutral-50">
      {/* Image slider */}
      <div className="pt-6 sm:pt-8">
        <div className="mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] sm:max-w-[620px] lg:max-w-[940px] xl:w-[calc(100%-100px)] xl:max-w-[1580px]">
          <ImageSlider
            slides={imageSliderSlides}
            autoplay
            autoplayInterval={3000}
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
            <CardImageTitle key={category.title} {...category} />
          ))}
        </SectionTitle>
      </SectionTitleGroupProps>

      <MarqueeText
        title="Mastery is a never-ending exploration"
        speed={30}
        fontSize="text-8xl"
      />

      <ImageComparison
        imageOne="https://laserox.net/cdn/shop/files/Picture_201509_MH40S5_marbletableplant_2_jpg.png?v=1714735329&width=1000"
        imageTwo="https://laserox.net/cdn/shop/files/2024-05-03T132444.466.png?v=1714735542&width=1000"
      />

      <div className="py-16 sm:py-20">
        <SectionTitle
          title="Featured Products"
          more={{ label: "View all", href: "/products" }}
        >
          <div className="col-span-full">
            <ProductGallery type="featured" images={featuredProducts} />

            <ProductDemo />
          </div>
        </SectionTitle>
      </div>

      <VideoFrame
        type="youtube"
        src="https://www.youtube.com/embed/HjsGUuQsQOY?si=ZcxnS0Ln7VPw4BqD"
      />

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
            <CardImageTitle key={game.title} {...game} />
          ))}
        </SectionTitle>
      </SectionTitleGroupProps>

      <PlayerReviewsSection />

      <CompanyLinksSection />

      <UpcomingProductsSection />
    </main>
  );
}

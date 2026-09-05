"use client";

import { useCallback, useEffect, useState } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ProductCard,
  type ProductCardProps,
} from "@/components/shared/product-card";
import {
  ProductThumbnail,
  type ProductThumbnailImage,
} from "@/components/shared/product-thumbnail";
import { cn } from "@/utils/cn";

interface ProductGalleryBaseProps {
  className?: string;
}

export interface FeaturedProductGalleryProps extends ProductGalleryBaseProps {
  type: "featured";
  images: readonly ProductCardProps[];
}

export interface DetailProductGalleryProps extends ProductGalleryBaseProps {
  type: "detail";
  images: readonly ProductThumbnailImage[];
  selectedIndex?: number;
  onImageSelect?: (image: ProductThumbnailImage, index: number) => void;
}

export type ProductGalleryProps =
  | FeaturedProductGalleryProps
  | DetailProductGalleryProps;

export function ProductGallery(props: ProductGalleryProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const detailImages = props.type === "detail" ? props.images : null;
  const detailOnImageSelect =
    props.type === "detail" ? props.onImageSelect : undefined;

  const syncSelectedImage = useCallback(
    (api: CarouselApi): void => {
      if (!api || !detailImages?.length) {
        return;
      }

      const originalIndex = api.selectedScrollSnap() % detailImages.length;
      const selectedImage = detailImages[originalIndex];

      if (selectedImage) {
        detailOnImageSelect?.(selectedImage, originalIndex);
      }
    },
    [detailImages, detailOnImageSelect],
  );

  useEffect(() => {
    if (!carouselApi || !detailImages) {
      return;
    }

    carouselApi.on("select", syncSelectedImage);

    return () => {
      carouselApi.off("select", syncSelectedImage);
    };
  }, [carouselApi, detailImages, syncSelectedImage]);

  if (props.images.length === 0) {
    return null;
  }

  if (props.type === "featured") {
    return (
      <Carousel
        opts={{ align: "start", dragFree: true }}
        aria-label="Sản phẩm nổi bật"
        className={cn("w-full", props.className)}
      >
        <CarouselContent className="-ml-2">
          {props.images.map((product) => (
            <CarouselItem
              key={`${product.slug}-${product.gui}`}
              className="basis-[88%] pl-2 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 z-20 size-12 border-0 bg-white text-neutral-950 shadow-lg hover:bg-neutral-100 disabled:hidden" />
        <CarouselNext className="right-3 z-20 size-12 border-0 bg-white text-neutral-950 shadow-lg hover:bg-neutral-100 disabled:hidden" />
      </Carousel>
    );
  }

  const loopImages = [0, 1].flatMap((copy) =>
    props.images.map((image, originalIndex) => ({
      copy,
      image,
      originalIndex,
    })),
  );

  return (
    <Carousel
      orientation="vertical"
      opts={{ align: "start", dragFree: true, loop: true }}
      setApi={setCarouselApi}
      aria-label="Ảnh thu nhỏ của sản phẩm"
      className={cn(
        "flex w-full flex-col items-center gap-1 [&_[data-slot=carousel-content]]:h-76 [&_[data-slot=carousel-content]]:w-full",
        props.className,
      )}
    >
      <CarouselPrevious className="static top-auto left-auto z-20 size-7 shrink-0 translate-x-0 rotate-90 border-0 bg-white text-neutral-950 shadow-lg hover:bg-neutral-100 disabled:hidden" />

      <CarouselContent className="h-full w-full -mt-1">
        {loopImages.map(({ copy, image, originalIndex }) => (
          <CarouselItem
            key={`${image.id}-copy-${copy}`}
            className="basis-1/4 pt-1"
          >
            <ProductThumbnail
              image={image}
              isSelected={props.selectedIndex === originalIndex}
              onSelect={(selectedImage) =>
                props.onImageSelect?.(selectedImage, originalIndex)
              }
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselNext className="static right-auto bottom-auto left-auto z-20 size-7 shrink-0 translate-x-0 rotate-90 border-0 bg-white text-neutral-950 shadow-lg hover:bg-neutral-100 disabled:hidden" />
    </Carousel>
  );
}

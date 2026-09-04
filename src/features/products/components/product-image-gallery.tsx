"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ProductImageDto } from "@/features/products/types/product-details";
import { cn } from "@/utils/cn";

interface ProductImageGalleryProps {
  images: ProductImageDto[];
  productName: string;
}

interface ProductThumbnailProps {
  image: ProductImageDto;
  isSelected: boolean;
  productName: string;
  onSelect: (imageId: string) => void;
}

function ProductThumbnail({
  image,
  isSelected,
  productName,
  onSelect,
}: ProductThumbnailProps) {
  return (
    <button
      type="button"
      aria-label={`Xem ảnh ${image.altText ?? productName}`}
      aria-pressed={isSelected}
      onClick={() => onSelect(image.id)}
      className={cn(
        "relative block aspect-square w-full overflow-hidden rounded-lg border bg-white p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
        isSelected
          ? "border-neutral-900 ring-1 ring-neutral-900"
          : "border-neutral-200 hover:border-neutral-500",
      )}
    >
      {image.publicUrl ? (
        <Image
          src={image.publicUrl}
          alt={image.altText ?? productName}
          fill
          unoptimized
          sizes="80px"
          className="object-contain p-1"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-xs text-neutral-400">
          Chưa có ảnh
        </span>
      )}
    </button>
  );
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const sortedImages = useMemo(
    () => [...images].sort((a, b) => a.displayOrder - b.displayOrder),
    [images],
  );
  const initialImage =
    sortedImages.find((image) => image.isPrimary) ?? sortedImages[0];
  const [selectedImageId, setSelectedImageId] = useState(initialImage?.id);
  const selectedImage =
    sortedImages.find((image) => image.id === selectedImageId) ?? initialImage;

  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-[5rem_minmax(0,1fr)] md:gap-4">
      {sortedImages.length > 0 ? (
        <>
          <Carousel
            opts={{ align: "start", dragFree: true }}
            aria-label="Ảnh thu nhỏ của sản phẩm"
            className="order-2 w-full px-8 md:hidden"
          >
            <CarouselContent className="-ml-2">
              {sortedImages.map((image) => (
                <CarouselItem
                  key={image.id}
                  className="basis-1/4 pl-2 sm:basis-1/5"
                >
                  <ProductThumbnail
                    image={image}
                    isSelected={image.id === selectedImage?.id}
                    productName={productName}
                    onSelect={setSelectedImageId}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 size-7 disabled:hidden" />
            <CarouselNext className="right-0 size-7 disabled:hidden" />
          </Carousel>

          <Carousel
            orientation="vertical"
            opts={{ align: "start", dragFree: true }}
            aria-label="Ảnh thu nhỏ của sản phẩm"
            className="hidden h-full min-h-0 py-8 md:block [&_[data-slot=carousel-content]]:h-full"
          >
            <CarouselContent className="h-full -mt-2">
              {sortedImages.map((image) => (
                <CarouselItem key={image.id} className="basis-1/4 pt-2">
                  <ProductThumbnail
                    image={image}
                    isSelected={image.id === selectedImage?.id}
                    productName={productName}
                    onSelect={setSelectedImageId}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="top-0 size-7 disabled:hidden" />
            <CarouselNext className="bottom-0 size-7 disabled:hidden" />
          </Carousel>
        </>
      ) : null}

      <div className="group relative order-1 aspect-[3/4] min-w-0 overflow-hidden rounded-xl border border-neutral-200 bg-white p-2 shadow-sm md:order-2 md:rounded-2xl">
        {selectedImage?.publicUrl ? (
          <Image
            src={selectedImage.publicUrl}
            alt={selectedImage.altText ?? productName}
            fill
            unoptimized
            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 80vw, 45vw"
            className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
            <span className="text-sm font-medium text-neutral-400 md:text-base">
              Ảnh chính
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

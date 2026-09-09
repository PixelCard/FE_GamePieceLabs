"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

import { ProductGallery } from "@/components/shared/product-gallery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProductImageDto } from "@/features/products/types/product-details";

interface ProductImageGalleryProps {
  images: ProductImageDto[];
  productName: string;
}

function getLargeImageUrl(url: string): string {
  return url.replace(/([?&])width=\d+/, "$1width=1200");
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const sortedImages = useMemo(
    () => [...images].sort((a, b) => a.displayOrder - b.displayOrder),
    [images],
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const selectedImage = sortedImages[selectedImageIndex] ?? sortedImages[0];
  const galleryImages = sortedImages.map((image, index) => ({
    id: `${image.id}-${index}`,
    src: image.publicUrl ? getLargeImageUrl(image.publicUrl) : "/window.svg",
    alt: image.altText ?? `${productName} - ảnh ${index + 1}`,
  }));

  return (
    <>
      <div className="min-w-0 lg:sticky lg:top-6 lg:self-start">
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-5">
          {sortedImages.length > 1 && (
            <div className="order-2 flex min-w-0 sm:order-1 sm:min-h-0">
              <ProductGallery
                type="detail"
                images={galleryImages}
                className="self-center"
                selectedIndex={selectedImageIndex}
                onImageSelect={(_, index) => setSelectedImageIndex(index)}
              />
            </div>
          )}

          <div className="relative order-1 aspect-square min-w-0 overflow-hidden rounded-2xl bg-neutral-950 sm:order-2">
            {selectedImage?.publicUrl ? (
              <Image
                src={getLargeImageUrl(selectedImage.publicUrl)}
                alt={selectedImage.altText ?? productName}
                fill
                priority
                unoptimized
                sizes="(max-width: 639px) calc(100vw - 64px), (max-width: 1023px) calc(100vw - 160px), 50vw"
                className="object-contain transition-transform duration-500 hover:scale-[1.015]"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                Chưa có ảnh sản phẩm
              </div>
            )}

            {selectedImage?.publicUrl && (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Phóng to ảnh sản phẩm"
                onClick={() => setIsZoomOpen(true)}
                className="absolute right-4 bottom-4 rounded-full bg-white text-neutral-950 shadow-lg hover:bg-neutral-100"
              >
                <ZoomIn />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent
          overlayClassName="bg-black/75 supports-backdrop-filter:backdrop-blur-sm"
          className="max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-5xl gap-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-0 text-neutral-950 shadow-[0_24px_80px_rgba(0,0,0,0.3)] ring-1 ring-black/5 sm:w-[calc(100vw-3rem)] sm:rounded-3xl lg:max-w-7xl xl:max-w-[90rem] [&_[data-slot=dialog-close]]:top-3 [&_[data-slot=dialog-close]]:right-3 [&_[data-slot=dialog-close]]:z-20 [&_[data-slot=dialog-close]]:size-9 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-neutral-100 [&_[data-slot=dialog-close]]:text-neutral-500 [&_[data-slot=dialog-close]]:ring-1 [&_[data-slot=dialog-close]]:ring-neutral-200 [&_[data-slot=dialog-close]]:hover:bg-neutral-200 [&_[data-slot=dialog-close]]:hover:text-neutral-700"
        >
          <DialogHeader className="relative border-b border-neutral-200 bg-white px-4 py-4 pr-16 text-left sm:px-6 sm:py-5">
            <DialogTitle className="line-clamp-1 text-base leading-snug font-semibold text-neutral-950 sm:text-lg">
              {productName}
            </DialogTitle>
          </DialogHeader>

          {selectedImage?.publicUrl && (
            <div className="flex min-h-0 items-center justify-center bg-neutral-50 p-3 sm:p-6">
              <div className="relative h-[min(58dvh,28rem)] w-full sm:h-[min(70dvh,44rem)] lg:h-[min(74dvh,48rem)]">
                <Image
                  src={getLargeImageUrl(selectedImage.publicUrl)}
                  alt={selectedImage.altText ?? productName}
                  fill
                  unoptimized
                  sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 96px), 1024px"
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

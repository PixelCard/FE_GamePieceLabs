"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { ProductImageDto } from "@/features/products/types/product-details";
import { ProductGallery } from "@/components/shared/product/product-gallery";
import { cn } from "@/utils/cn";

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
            <div className="order-2 hidden min-w-0 sm:order-1 sm:flex sm:min-h-0">
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

          {sortedImages.length > 1 && (
            <div
              role="group"
              aria-label="Chọn ảnh sản phẩm"
              className="order-2 flex items-center justify-center gap-1 sm:hidden"
            >
              {sortedImages.map((image, index) => {
                const isSelected = selectedImageIndex === index;

                return (
                  <Button
                    key={image.id}
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Xem ảnh ${index + 1} của ${productName}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedImageIndex(index)}
                    className="group size-10 rounded-full hover:bg-transparent focus-visible:ring-neutral-950"
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full transition-colors",
                        isSelected
                          ? "bg-neutral-950"
                          : "bg-neutral-300 group-hover:bg-neutral-500",
                      )}
                    />
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent
          overlayClassName="bg-white backdrop-blur-none"
          className="inset-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 items-center justify-center gap-0 overflow-hidden rounded-none border-0 bg-white p-4 text-neutral-950 shadow-none ring-0 sm:max-w-none sm:p-8 data-open:zoom-in-100 data-closed:zoom-out-100 [&_[data-slot=dialog-close]]:top-4 [&_[data-slot=dialog-close]]:right-4 [&_[data-slot=dialog-close]]:z-20 [&_[data-slot=dialog-close]]:size-10 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-white [&_[data-slot=dialog-close]]:text-neutral-950 [&_[data-slot=dialog-close]]:shadow-md [&_[data-slot=dialog-close]]:ring-1 [&_[data-slot=dialog-close]]:ring-neutral-200 [&_[data-slot=dialog-close]]:hover:bg-neutral-100 sm:[&_[data-slot=dialog-close]]:top-6 sm:[&_[data-slot=dialog-close]]:right-6"
        >
          <DialogTitle className="sr-only">
            Ảnh phóng to của {productName}
          </DialogTitle>

          {selectedImage?.publicUrl && (
            <div className="relative h-full w-full">
              <Image
                src={getLargeImageUrl(selectedImage.publicUrl)}
                alt={selectedImage.altText ?? productName}
                fill
                unoptimized
                sizes="100vw"
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

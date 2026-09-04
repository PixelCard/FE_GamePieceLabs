"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

import { ProductGallery } from "@/components/shared/product-gallery";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
        <DialogContent className="h-[90vh] min-w-4xl overflow-hidden bg-neutral-950 p-0 ring-white/10">
          <DialogTitle className="sr-only">Ảnh lớn của {productName}</DialogTitle>
          {selectedImage?.publicUrl && (
            <div className="relative h-full w-full">
              <Image
                src={getLargeImageUrl(selectedImage.publicUrl)}
                alt={selectedImage.altText ?? productName}
                fill
                className="object-contain p-4"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { use, useState } from "react";
import Image from "next/image";
import {
  Box,
  Check,
  CreditCard,
  Minus,
  PackageOpen,
  Plus,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  ZoomIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getMockProductById } from "@/features/products/lib/mock-product-details";
import { formatCurrency } from "@/utils/format-currency";
import BreadCrumbs from "@/components/shared/breadcrumbs";
import { ProductGallery } from "@/components/shared/product-gallery";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

const productFeatures = [
  "Được thiết kế riêng cho Gloomhaven: Buttons & Bugs",
  "Sắp xếp gọn toàn bộ thẻ bài và linh kiện trong hộp game gốc",
  "Tương thích với thẻ đã bọc sleeve cao cấp, tối đa 80 microns",
  "Gồm 2 khay thẻ có thể tháo rời và khay đựng cube, token",
  "Các khay có tay cầm giúp lấy ra, cất vào nhanh chóng",
  "Tháo lắp dễ dàng, rút ngắn đáng kể thời gian setup và thu dọn",
  "Khắc họa tiết theo chủ đề, vừa đẹp mắt vừa dễ phân loại",
];

function getLargeImageUrl(url: string): string {
  return url.replace(/([?&])width=\d+/, "$1width=1200");
}

export default function ProductDetailPage({ params }: ProductDetailsPageProps) {
  const { id: productId } = use(params);
  const product = getMockProductById(productId);
  const images = product
    ? [...product.images].sort((a, b) => a.displayOrder - b.displayOrder)
    : [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          Không tìm thấy sản phẩm này. Vui lòng kiểm tra lại đường dẫn.
        </div>
      </main>
    );
  }

  const selectedImage = images[selectedImageIndex] ?? images[0];
  const discount = product.discountPercentage ?? 0;
  const sellingPrice = Math.round(product.orginalPrice * (1 - discount / 100));
  const galleryImages = images.map((image, index) => ({
    id: `${image.id}-${index}`,
    src: image.publicUrl
      ? getLargeImageUrl(image.publicUrl)
      : "/window.svg",
    alt: image.altText ?? `${product.name} - ảnh ${index + 1}`,
  }));

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-5 text-neutral-950">
      <div className="mx-auto max-w-[1440px]">
        <BreadCrumbs />

        <section className="grid gap-10 rounded-3xl bg-white p-4 shadow-[0_18px_60px_rgba(0,0,0,0.06)] sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-10 xl:gap-16">
          <div className="min-w-0 lg:sticky lg:top-6 lg:self-start">
            <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-5">
              {images.length > 1 && (
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
                    alt={selectedImage.altText ?? product.name}
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

          <div className="min-w-0 lg:py-1">
            <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">
              GamePiece Labs
            </p>

            <div className="mb-5 flex items-center gap-2 text-sm">
              <div
                className="flex text-amber-500"
                aria-label="Đánh giá 4.9 trên 5 sao"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className="size-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <button
                type="button"
                className="underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-red-700"
              >
                4.9 · 10 đánh giá
              </button>
            </div>

            <h1 className="max-w-xl text-3xl leading-[1.05] font-extrabold tracking-tight sm:text-4xl xl:text-5xl">
              {product.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-neutral-200 pb-6">
              <span className="text-2xl font-bold text-red-700">
                {formatCurrency(sellingPrice, "VND")}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-sm text-neutral-400 line-through">
                    {formatCurrency(product.orginalPrice, "VND")}
                  </span>
                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2 py-6 sm:max-w-md">
              <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 text-center text-[11px] font-semibold">
                <Box className="size-5" />
                Vừa hộp gốc
              </div>
              <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 text-center text-[11px] font-semibold">
                <Sparkles className="size-5" />
                Khắc họa tiết
              </div>
              <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 text-center text-[11px] font-semibold">
                <PackageOpen className="size-5" />
                Setup nhanh
              </div>
              <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 text-center text-[11px] font-semibold">
                <ShieldCheck className="size-5" />
                Thẻ có sleeve
              </div>
            </div>

            <p className="text-sm leading-6 text-neutral-600">
              {product.description}
            </p>

            <ul className="mt-5 space-y-2 text-sm leading-5 text-neutral-700">
              {productFeatures.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-red-700" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-neutral-100 px-4 py-3 text-sm">
              <Ruler className="size-5 shrink-0" />
              <p>
                <span className="font-bold">Kích thước hộp lắp ráp:</span> 20,5
                × 15,5 × 7,2 cm
              </p>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
                Vật liệu
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.materials.map((material) => (
                  <span
                    key={material.id}
                    className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-semibold"
                  >
                    {material.matterialName}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <span className="text-xs font-semibold text-neutral-500">
                Số lượng
              </span>
              <div className="mt-2 flex h-11 w-32 items-center justify-between rounded-full border border-neutral-300 px-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Giảm số lượng"
                  disabled={quantity === 1}
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="rounded-full"
                >
                  <Minus />
                </Button>
                <output
                  className="min-w-6 text-center text-sm font-semibold"
                  aria-live="polite"
                >
                  {quantity}
                </output>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Tăng số lượng"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="rounded-full"
                >
                  <Plus />
                </Button>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-700">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Check className="size-3" strokeWidth={3} />
              </span>
              Còn hàng — sẵn sàng giao
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                size="lg"
                onClick={() => setIsAdded(true)}
                className="rounded-full bg-red-700 text-white shadow-none hover:bg-red-800"
              >
                {isAdded ? (
                  <>
                    <Check /> Đã thêm {quantity} sản phẩm
                  </>
                ) : (
                  <>Thêm vào giỏ hàng</>
                )}
              </Button>
              <Button
                type="button"
                size="lg"
                className="rounded-full bg-violet-600 text-white shadow-none hover:bg-violet-700"
              >
                Mua ngay
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 sm:justify-end">
              <span className="inline-flex items-center gap-1.5">
                <CreditCard className="size-4" /> Thanh toán an toàn
              </span>
              <button
                type="button"
                className="underline underline-offset-4 hover:text-neutral-950"
              >
                Xem thêm phương thức thanh toán
              </button>
            </div>
          </div>
        </section>
      </div>

      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="h-[90vh] max-w-[min(92vw,1100px)] overflow-hidden bg-neutral-950 p-0 ring-white/10">
          <DialogTitle className="sr-only">
            Ảnh lớn của {product.name}
          </DialogTitle>
          {selectedImage?.publicUrl && (
            <div className="relative h-full w-full">
              <Image
                src={getLargeImageUrl(selectedImage.publicUrl)}
                alt={selectedImage.altText ?? product.name}
                fill
                unoptimized
                sizes="92vw"
                className="object-contain p-4"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

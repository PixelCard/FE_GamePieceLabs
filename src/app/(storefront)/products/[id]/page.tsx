import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, AlertTriangle } from "lucide-react";
// import { getProductByIdAsync } from "@/features/products/services/products-api";
import AddToCartButton from "@/features/products/components/add-to-cart-button";
import { getMockProductById } from "@/features/products/lib/mock-product-details";
import type { ProductDetailDto } from "@/features/products/types/product-details";
import StoreSectionHeading from "@/components/shared/store-section-heading";
import { formatCurrency } from "@/utils/format-currency";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailsPageProps) {
  const { id: productId } = await params;

  // let productDetails: Awaited<ReturnType<typeof getProductByIdAsync>> | null = null;
  // let hasError = false;
  //
  // if (productId) {
  //   try {
  //     productDetails = await getProductByIdAsync(productId);
  //   } catch {
  //     hasError = true;
  //   }
  // } else {
  //   hasError = true;
  // }

  const productDetails: ProductDetailDto | null = getMockProductById(productId) ?? null;
  const hasError = productDetails === null;

  const primaryImage =
    productDetails?.images.find((x) => x.isPrimary)?.publicUrl ??
    productDetails?.images[0]?.publicUrl ??
    null;

  const displayedPrice = productDetails
    ? productDetails.orginalPrice -
      productDetails.orginalPrice * ((productDetails.discountPercentage ?? 0) / 100)
    : 0;

  return (
    <div className="min-h-screen bg-neutral-50 pb-16 font-sans text-neutral-900 md:pb-24">
      <div className="mx-auto max-w-6xl overflow-x-auto whitespace-nowrap px-4 py-4 scrollbar-hide md:px-6 md:py-6">
        <nav className="text-xs font-medium text-neutral-500 md:text-sm">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-neutral-900">
                Trang chủ
              </Link>
            </li>
            <li><span>/</span></li>
            <li>
              <Link href="/" className="transition-colors hover:text-neutral-900">
                Danh mục
              </Link>
            </li>
            <li><span>/</span></li>
            <li className="text-neutral-900">Chi tiết sản phẩm</li>
          </ol>
        </nav>
      </div>

      <main className="mx-auto max-w-6xl px-4 md:px-6">
        {hasError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Không thể tải chi tiết sản phẩm. Vui lòng kiểm tra lại sản phẩm hoặc API.
          </div>
        ) : null}

        {!hasError && productDetails ? (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="w-full space-y-3 md:space-y-4 lg:sticky lg:top-24 lg:w-1/2">
              <div className="group relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-xl border border-neutral-200 bg-white p-2 shadow-sm md:rounded-2xl lg:max-w-none">
                {primaryImage ? (
                  <Image
                    src={primaryImage}
                    alt={productDetails.name}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                    <span className="text-sm font-medium text-neutral-400 md:text-base">Ảnh chính</span>
                  </div>
                )}
              </div>

              <div className="scrollbar-hide flex justify-center gap-3 overflow-x-auto pb-2 md:gap-4 lg:justify-start">
                {productDetails.images.length > 0 ? (
                  [...productDetails.images]
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((img) => (
                      <div
                        key={img.id}
                        className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-neutral-300 bg-white p-1 md:h-20 md:w-20"
                      >
                        {img.publicUrl ? (
                          <Image
                            src={img.publicUrl}
                            alt={img.altText ?? productDetails.name}
                            fill
                            unoptimized
                            sizes="80px"
                            className="rounded-md object-contain p-1"
                          />
                        ) : (
                          <div className="h-full w-full rounded-md bg-neutral-200" />
                        )}
                      </div>
                    ))
                ) : (
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-neutral-300 bg-white p-1 md:h-20 md:w-20">
                    <div className="h-full w-full rounded-md bg-neutral-200" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col lg:w-1/2">
              <div className="mb-4 flex flex-wrap items-center gap-2 md:gap-3">
                <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-700 md:px-2.5 md:text-xs">
                  Đặt trước
                </span>
                <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600 md:px-2.5 md:text-xs">
                  Gói nhỏ
                </span>
              </div>

              <h1 className="type-h2 mb-3 text-neutral-950">
                {productDetails.name}
              </h1>

              <div className="mb-6 w-full rounded-xl border border-neutral-200 bg-white p-4 shadow-sm md:rounded-2xl md:p-6">
                <div className="mb-2 flex flex-wrap items-end gap-2 md:gap-3">
                  <span className="type-h2 text-neutral-950">
                    {formatCurrency(displayedPrice, "VND")}
                  </span>
                  {(productDetails.discountPercentage ?? 0) > 0 ? (
                    <span className="mb-1 rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-red-600 md:py-1 md:text-xs">
                      Giảm {productDetails.discountPercentage}%
                    </span>
                  ) : null}
                </div>

                <hr className="my-4 border-neutral-200 md:my-6" />

                <div className="flex flex-wrap gap-3 sm:flex-nowrap md:gap-4">
                  <AddToCartButton productId={productDetails.id} />

                  <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 transition hover:bg-neutral-50 hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-800 md:text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <p>
                    <strong>Sản phẩm không thể hủy.</strong> Vui lòng kiểm tra kỹ đơn hàng trước khi thanh toán.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {!hasError && productDetails ? (
        <section className="mx-auto mt-12 max-w-4xl px-4 md:mt-24 md:px-6">
          <div className="space-y-8 md:space-y-12">
            <div>
              <div className="mb-4 border-b border-neutral-200 pb-3 md:mb-6 md:pb-4">
                <StoreSectionHeading
                  title="Mô tả sản phẩm"
                  description="Thông tin mô tả, chất liệu và các chi tiết cần xem trước khi đặt mua."
                />
              </div>

              {productDetails.materials.length > 0 ? (
                <div className="mb-4">
                  <h3 className="type-h6 mb-2 text-neutral-500">
                    Chất liệu
                  </h3>
                  <ul className="space-y-1 text-base text-neutral-700 md:space-y-2">
                    {productDetails.materials.map((material) => (
                      <li key={material.id}>- {material.matterialName}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {productDetails.description ? (
                <div>
                  <h3 className="type-h6 mb-2 text-neutral-500">
                    Chi tiết
                  </h3>
                  <p className="text-base leading-[1.6] text-neutral-700">
                    {productDetails.description}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

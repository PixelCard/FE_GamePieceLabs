import { Box, PackageOpen, Ruler, ShieldCheck, Sparkles, Star } from "lucide-react";

import type { ProductDetailDto } from "@/features/products/types/product-details";
import { formatCurrency } from "@/utils/format-currency";
import FeatureList from "./feature-list";

interface ProductDetailsSummaryProps {
  product: ProductDetailDto;
}

export default function ProductDetailsSummary({
  product,
}: ProductDetailsSummaryProps) {
  const discount = product.discountPercentage ?? 0;
  const sellingPrice = Math.round(product.orginalPrice * (1 - discount / 100));

  return (
    <>
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

      <div className="grid w-full max-w-xs grid-cols-4 gap-2 py-2">
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

      <FeatureList features={product.features} />

      <div className="mt-6 flex items-center gap-3 rounded-xl bg-neutral-100 px-4 py-3 text-sm">
        <Ruler className="size-5 shrink-0" />
        <p>
          <span className="font-bold">Kích thước hộp lắp ráp:</span> 20,5 × 15,5
          × 7,2 cm
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
    </>
  );
}

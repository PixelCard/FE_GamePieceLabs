"use client";

import type { ProductCrudDto } from "@/features/admin/products/types/products-crud.type";
import ProductStatusBadge from "./ProductStatusBadge";

type ProductDetailCardProps = {
  product: ProductCrudDto | null;
  loading: boolean;
};

export default function ProductDetailCard({
  product,
  loading,
}: ProductDetailCardProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
        <div className="space-y-4">
          <div className="h-8 w-52 animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
          <div className="h-20 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
          <div className="h-20 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/10 dark:bg-[#0b1020]">
        <h3 className="text-base font-semibold text-slate-950 dark:text-white">
          Product not found
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Product was not found in the latest API result.
        </p>
      </div>
    );
  }

  const quantity = Number(product.quantity ?? 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
      <div className="border-b border-slate-200 p-6 dark:border-white/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {product.productName}
            </h2>
            <p className="mt-1 break-all text-sm text-slate-500 dark:text-slate-400">
              {product.id}
            </p>
          </div>

          <ProductStatusBadge quantity={quantity} />
        </div>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-3">
        <InfoCard
          label="Original Price"
          value={Number(product.orginalPrice ?? 0).toLocaleString()}
        />
        <InfoCard label="Quantity" value={quantity} />
        <InfoCard
          label="Discount"
          value={
            product.discountPercentage === null ||
            product.discountPercentage === undefined
              ? "No discount"
              : `${product.discountPercentage}%`
          }
        />
      </div>

      <div className="grid gap-6 border-t border-slate-200 p-6 dark:border-white/10 md:grid-cols-2">
        <section>
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
            Basic Information
          </h3>

          <dl className="mt-4 space-y-3 text-sm">
            <InfoRow label="Scale" value={product.scale || "No data"} />
            <InfoRow
              label="Status"
              value={String(product.status ?? "No data")}
            />
            <InfoRow label="Product Note" value={product.productNote || "No note"} />
          </dl>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
            Relations
          </h3>

          <dl className="mt-4 space-y-3 text-sm">
            <InfoRow
              label="Category"
              value={product.categoryName || "No data"}
              helper={product.categoryId || undefined}
            />
            <InfoRow
              label="Provider"
              value={product.providerName || "No data"}
              helper={product.providerId || undefined}
            />
            <InfoRow
              label="Source"
              value={product.productSourceName || "No data"}
              helper={product.productSouceId || undefined}
            />
          </dl>
        </section>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function InfoRow({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 break-all text-slate-800 dark:text-slate-200">
        {value}
      </dd>
      {helper ? (
        <p className="mt-1 break-all text-xs text-slate-500 dark:text-slate-400">
          ID: {helper}
        </p>
      ) : null}
    </div>
  );
}

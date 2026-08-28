"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Edit,
  Package,
  Tag,
  Truck,
  Database,
  DollarSign,
  Boxes,
} from "lucide-react";

import { getAdminProductByIdAsync } from "@/features/admin/products/services/products-crud-api";
import type { ProductCrudDto } from "@/features/admin/products/types/products-crud.type";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function shortId(id: string) {
  if (id.length <= 12) return id;
  return `${id.slice(0, 4)}...${id.slice(-4)}`;
}

function formatNumber(value: unknown) {
  return Number(value ?? 0).toLocaleString();
}

function getStockStatus(quantity: number) {
  if (quantity <= 0) {
    return {
      label: "Out of Stock",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  if (quantity <= 15) {
    return {
      label: "Low Stock",
      className: "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  return {
    label: "Active",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);

  const [product, setProduct] = useState<ProductCrudDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const productName = useMemo(() => {
    if (loading) return "Loading product...";
    return product?.productName ?? "Product Detail";
  }, [loading, product]);

  const quantity = Number(product?.quantity ?? 0);
  const status = getStockStatus(quantity);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getAdminProductByIdAsync(id);
        setProduct(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cannot load product detail");
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [id]);

  const copyId = async () => {
    await navigator.clipboard.writeText(id);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  return (
    <main className="w-full space-y-5 pb-8">
      <header className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
        <div className="px-6 py-5">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
          >
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1 font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Products
            </Link>

            <span>/</span>
            <span>Detail</span>

            <button
              type="button"
              onClick={() => void copyId()}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10"
            >
              ID: {shortId(id)}
              {copied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </nav>

          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-3xl">
                {productName}
              </h1>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                View product information, pricing, relations and internal note.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {product ? (
                <>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>

                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    Price: {formatNumber(product.orginalPrice)}
                  </span>

                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    Stock: {quantity}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {loading ? (
        <ProductDetailSkeleton />
      ) : product ? (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
          <DetailRow
            title="Basic Information"
            description="Core product identity and display data."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard
                icon={Package}
                label="Product name"
                value={product.productName}
              />

              <InfoCard
                icon={Boxes}
                label="Scale"
                value={product.scale || "Không đủ dữ liệu"}
              />

              <InfoCard
                icon={Tag}
                label="Status"
                value={String(product.status ?? "Không đủ dữ liệu")}
              />
            </div>
          </DetailRow>

          <DetailRow
            title="Pricing & Stock"
            description="Price, discount and inventory quantity."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard
                icon={DollarSign}
                label="Original price"
                value={formatNumber(product.orginalPrice)}
              />

              <InfoCard
                icon={Tag}
                label="Discount"
                value={
                  product.discountPercentage === null ||
                  product.discountPercentage === undefined
                    ? "No discount"
                    : `${product.discountPercentage}%`
                }
              />

              <InfoCard
                icon={Boxes}
                label="Quantity"
                value={String(quantity)}
              />
            </div>
          </DetailRow>

          <DetailRow
            title="Relations"
            description="Connected category, provider and source records."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard
                icon={Tag}
                label="Category ID"
                value={product.categoryId || "Không đủ dữ liệu"}
                mono
              />

              <InfoCard
                icon={Truck}
                label="Provider ID"
                value={product.providerId || "Không đủ dữ liệu"}
                mono
              />

              <InfoCard
                icon={Database}
                label="Source ID"
                value={product.productSouceId || "Không đủ dữ liệu"}
                mono
              />
            </div>
          </DetailRow>

          <DetailRow
            title="Internal Note"
            description="Private note for admin catalog maintenance."
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="min-h-[96px] whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">
                {product.productNote || "No note"}
              </p>
            </div>
          </DetailRow>

          <div className="flex items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
              Product detail is read-only. Use Edit Product to update this
              record.
            </p>

            <div className="ml-auto flex gap-3">
              <Link
                href="/admin/products"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Back
              </Link>

              <Link
                href={`/admin/products/${id}/edit`}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-medium text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                Edit Product
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/10 dark:bg-[#0b1020]">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Product not found
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Không tìm thấy product theo ID hiện tại.
          </p>

          <Link
            href="/admin/products"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white"
          >
            Back to Products
          </Link>
        </div>
      )}
    </main>
  );
}

function DetailRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 border-b border-slate-200 px-6 py-6 last:border-b-0 dark:border-white/10 xl:grid-cols-[220px_minmax(0,1fr)]">
      <div>
        <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
          {title}
        </h2>

        <p className="mt-1 max-w-[220px] text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div className="w-full">{children}</div>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <Icon className="size-4" />
        <p className="text-xs font-medium uppercase tracking-wide">{label}</p>
      </div>

      <p
        className={[
          "mt-3 break-all text-sm font-semibold text-slate-950 dark:text-white",
          mono ? "font-mono" : "",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
      {[1, 2, 3, 4].map((item) => (
        <section
          key={item}
          className="grid gap-6 border-b border-slate-200 px-6 py-6 last:border-b-0 dark:border-white/10 xl:grid-cols-[220px_minmax(0,1fr)]"
        >
          <div>
            <div className="h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
            <div className="mt-2 h-4 w-48 animate-pulse rounded bg-slate-100 dark:bg-white/10" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/10" />
            <div className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/10" />
            <div className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/10" />
          </div>
        </section>
      ))}
    </section>
  );
}
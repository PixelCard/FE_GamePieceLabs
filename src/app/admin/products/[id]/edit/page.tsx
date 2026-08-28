"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy } from "lucide-react";

import { getAdminProductByIdAsync } from "@/features/admin/products/services/products-crud-api";
import type { ProductCrudDto } from "@/features/admin/products/types/products-crud.type";
import ProductForm from "@/features/admin/products/components/ProductForm";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function shortId(id: string) {
  if (id.length <= 12) return id;
  return `${id.slice(0, 4)}...${id.slice(-4)}`;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params);

  const [product, setProduct] = useState<ProductCrudDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const productName = useMemo(() => {
    if (loading) return "Loading product...";
    return product?.productName ?? "Edit Product";
  }, [loading, product]);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getAdminProductByIdAsync(id);
        setProduct(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cannot load product for edit");
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
            <span>Edit</span>

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
                Update product information, pricing, relations and internal
                note.
              </p>
            </div>

            {product ? (
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  Price: {Number(product.orginalPrice ?? 0).toLocaleString()}
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  Stock: {product.quantity ?? 0}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <ProductForm
        key={product?.id ?? "product-form-loading"}
        mode="edit"
        productId={id}
        product={product}
        loading={loading}
      />
    </main>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteAdminProductAsync,
  getAdminProductsAsync,
} from "@/features/admin/products/services/products-crud-api";
import type { ProductCrudDto } from "@/features/admin/products/types/products-crud.type";
import ProductHero from "@/features/admin/products/components/ProductHero";
import ProductStats from "@/features/admin/products/components/ProductStats";
import ProductToolbar from "@/features/admin/products/components/ProductToolbar";
import ProductTable from "@/features/admin/products/components/ProductTable";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductCrudDto[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
      const quantity = Number(product.quantity ?? 0);

      const stockStatus =
        quantity <= 0 ? "out" : quantity <= 15 ? "low" : "active";

      const matchSearch =
        !keyword ||
        product.productName.toLowerCase().includes(keyword) ||
        product.id.toLowerCase().includes(keyword);

      const matchStatus = status === "all" || status === stockStatus;

      return matchSearch && matchStatus;
    });
  }, [products, search, status]);

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getAdminProductsAsync(0, 20);
      setProducts(result.items ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Cannot load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadProducts();
  }, []);

  const handleDelete = async (product: ProductCrudDto) => {
    const confirmed = window.confirm(`Delete "${product.productName}"?`);
    if (!confirmed) {
      return;
    }

    setDeletingId(product.id);
    setError("");

    try {
      await deleteAdminProductAsync(product.id);
      await loadProducts();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Cannot delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="space-y-6">
      <ProductHero
        eyebrow="Admin / Products"
        title="Product Catalog"
        description="Manage inventory, pricing, availability and catalog records."
        actionLabel="Add Product"
        actionHref="/admin/products/create"
      />

      <ProductStats products={products} loading={loading} />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
        <div className="border-b border-slate-200 p-5 dark:border-white/10">
          <ProductToolbar
            search={search}
            status={status}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onRefresh={() => void loadProducts()}
          />
        </div>

        {error ? (
          <div className="mx-5 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        ) : null}

        <ProductTable
          products={filteredProducts}
          loading={loading}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      </div>
    </section>
  );
}

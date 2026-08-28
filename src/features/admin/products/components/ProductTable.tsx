"use client";

import Link from "next/link";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { ProductCrudDto } from "@/features/admin/products/types/products-crud.type";
import ProductStatusBadge from "./ProductStatusBadge";

type ProductTableProps = {
  products: ProductCrudDto[];
  loading: boolean;
  deletingId: string | null;
  onDelete: (product: ProductCrudDto) => void;
};

export default function ProductTable({
  products,
  loading,
  deletingId,
  onDelete,
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="p-5">
        <div className="space-y-3">
          <div className="h-12 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
          <div className="h-12 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
          <div className="h-12 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-10 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
          <MoreVertical className="size-5" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">
          No products found
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Create a new product or change your search/filter.
        </p>

        <Link
          href="/admin/products/create"
          className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Add Product
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto px-5 pb-5">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
            <th className="w-10 px-4 py-3">
              <input
                type="checkbox"
                className="size-4 rounded border-slate-300"
              />
            </th>
            <th className="px-4 py-3">Product Name</th>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-white/10">
          {products.map((product) => {
            const quantity = Number(product.quantity ?? 0);

            return (
              <tr
                key={product.id}
                className="transition hover:bg-slate-50 dark:hover:bg-white/[0.04]"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-slate-300"
                  />
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-indigo-50 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                      {product.productName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">
                        {product.productName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Product record
                      </p>
                    </div>
                  </div>
                </td>

                <td className="max-w-[150px] truncate px-4 py-4 text-slate-500 dark:text-slate-400">
                  {product.id}
                </td>

                <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                  {product.categoryName || "No data"}
                </td>

                <td className="px-4 py-4 font-semibold text-slate-950 dark:text-white">
                  {Number(product.orginalPrice ?? 0).toLocaleString()}
                </td>

                <td className="px-4 py-4 text-slate-700 dark:text-slate-300">
                  {quantity}
                </td>

                <td className="px-4 py-4">
                  <ProductStatusBadge quantity={quantity} />
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="grid size-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <Pencil className="size-4" />
                    </Link>

                    <Link
                      href={`/admin/products/${product.id}`}
                      className="grid size-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <MoreVertical className="size-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onDelete(product)}
                      disabled={deletingId === product.id}
                      className="grid size-8 place-items-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-300 dark:hover:bg-red-500/10 dark:hover:text-red-200"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-slate-200 px-1 pt-4 dark:border-white/10">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing 1 to {products.length} of {products.length} entries
        </p>

        <div className="flex items-center gap-1">
          <button className="grid size-9 place-items-center rounded-lg border border-slate-200 text-sm text-slate-500 dark:border-white/10">
            {"<"}
          </button>
          <button className="grid size-9 place-items-center rounded-lg bg-indigo-600 text-sm font-medium text-white">
            1
          </button>
          <button className="grid size-9 place-items-center rounded-lg border border-slate-200 text-sm text-slate-600 dark:border-white/10 dark:text-slate-300">
            2
          </button>
          <button className="grid size-9 place-items-center rounded-lg border border-slate-200 text-sm text-slate-600 dark:border-white/10 dark:text-slate-300">
            3
          </button>
          <button className="grid size-9 place-items-center rounded-lg border border-slate-200 text-sm text-slate-500 dark:border-white/10">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

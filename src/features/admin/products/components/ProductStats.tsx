"use client";

import { AlertTriangle, Boxes, CheckCircle2, XCircle } from "lucide-react";
import type { ProductCrudDto } from "@/features/admin/products/types/products-crud.type";

type ProductStatsProps = {
  products: ProductCrudDto[];
  loading: boolean;
};

export default function ProductStats({ products, loading }: ProductStatsProps) {
  const active = products.filter((product) => Number(product.quantity ?? 0) > 15);

  const lowStock = products.filter((product) => {
    const quantity = Number(product.quantity ?? 0);
    return quantity > 0 && quantity <= 15;
  });

  const outOfStock = products.filter(
    (product) => Number(product.quantity ?? 0) <= 0,
  );

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      description: loading ? "Loading records..." : "Latest records from API",
      icon: Boxes,
      tone: "blue",
    },
    {
      label: "Active SKUs",
      value: active.length,
      description: "Available inventory",
      icon: CheckCircle2,
      tone: "emerald",
    },
    {
      label: "Low Stock",
      value: lowStock.length,
      description: "Requires attention",
      icon: AlertTriangle,
      tone: "amber",
    },
    {
      label: "Out of Stock",
      value: outOfStock.length,
      description: "Action needed",
      icon: XCircle,
      tone: "red",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        const toneClass =
          item.tone === "emerald"
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
            : item.tone === "amber"
              ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300"
              : item.tone === "red"
                ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300"
                : "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300";

        const barClass =
          item.tone === "emerald"
            ? "bg-emerald-500"
            : item.tone === "amber"
              ? "bg-amber-500"
              : item.tone === "red"
                ? "bg-red-500"
                : "bg-indigo-600";

        return (
          <div
            key={item.label}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]"
          >
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  {item.value}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>

              <div
                className={`grid size-11 place-items-center rounded-xl ${toneClass}`}
              >
                <Icon className="size-5" />
              </div>
            </div>

            <div className={`h-1.5 ${barClass}`} />
          </div>
        );
      })}
    </div>
  );
}
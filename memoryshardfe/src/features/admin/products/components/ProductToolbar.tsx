"use client";

import Link from "next/link";
import { Filter, Plus, RefreshCw, Search } from "lucide-react";

type ProductToolbarProps = {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRefresh: () => void;
};

export default function ProductToolbar({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onRefresh,
}: ProductToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
            Product List
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Browse, filter and manage product catalog records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <RefreshCw className="mr-2 size-4" />
            Refresh
          </button>

          <Link
            href="/admin/products/create"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 px-3 text-sm font-medium text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700 active:translate-y-px"
          >
            <Plus className="mr-2 size-4" />
            Add Product
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-3 dark:bg-white/[0.04] md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search product name or id..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <Filter className="size-4" />
            Filter
          </div>

          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-[#0b1020] dark:text-white"
          >
            <option value="all">Status: All</option>
            <option value="active">Active</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProductForm from "@/features/admin/products/components/ProductForm";

export const metadata = {
  title: "Create Product | Inventory Pro Admin",
  description: "Create a new product record in Inventory Pro admin panel.",
};

export default function CreateProductPage() {
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
            <span>Create</span>
          </nav>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-3xl">
            Create Product
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create a new product record with pricing, stock, relations and
            internal note.
          </p>
        </div>
      </header>

      <ProductForm mode="create" />
    </main>
  );
}

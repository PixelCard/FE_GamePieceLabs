"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  EntityCrudDetailCard,
  type CrudEntityItem,
} from "@/features/admin/components/EntityCrudUi";
import {
  deleteProviderAsync,
  getProviderByIdAsync,
} from "@/features/admin/providers/services/providers-api";

type ProviderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProviderDetailPage({
  params,
}: ProviderDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [item, setItem] = useState<CrudEntityItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getProviderByIdAsync(id);
        setItem({
          id: result.id,
          name: result.providerName,
          note: result.providerNote,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cannot load provider");
      } finally {
        setLoading(false);
      }
    };

    void loadProvider();
  }, [id]);

  const handleDelete = async () => {
    if (!item) return;

    const confirmed = window.confirm(
      `Delete provider "${item.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      await deleteProviderAsync(id);
      router.push("/admin/providers");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete provider failed");
    } finally {
      setDeleting(false);
    }
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
              href="/admin/providers"
              className="inline-flex items-center gap-1 font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Providers
            </Link>
            <span>/</span>
            <span>Detail</span>
          </nav>

          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-3xl">
                {loading ? "Loading provider..." : item?.name ?? "Provider Detail"}
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                View provider information and manage the record lifecycle.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/admin/providers/${id}/edit`}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
              >
                <Pencil className="mr-2 size-4" />
                Edit Provider
              </Link>
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={deleting || loading || !item}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
              >
                <Trash2 className="mr-2 size-4" />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <EntityCrudDetailCard
        entityLabel="Provider"
        item={item}
        loading={loading}
      />
    </main>
  );
}

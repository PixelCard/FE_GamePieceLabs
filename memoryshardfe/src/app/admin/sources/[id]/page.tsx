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
  deleteSourceAsync,
  getSourceByIdAsync,
} from "@/features/admin/sources/services/sources-api";

type SourceDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function SourceDetailPage({ params }: SourceDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [item, setItem] = useState<CrudEntityItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadSource = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getSourceByIdAsync(id);
        setItem({
          id: result.id,
          name: result.souceName,
          note: result.souceNote,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cannot load source");
      } finally {
        setLoading(false);
      }
    };

    void loadSource();
  }, [id]);

  const handleDelete = async () => {
    if (!item) return;

    const confirmed = window.confirm(
      `Delete source "${item.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      await deleteSourceAsync(id);
      router.push("/admin/sources");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete source failed");
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
              href="/admin/sources"
              className="inline-flex items-center gap-1 font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Sources
            </Link>
            <span>/</span>
            <span>Detail</span>
          </nav>

          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-3xl">
                {loading ? "Loading source..." : item?.name ?? "Source Detail"}
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                View source information and manage the record lifecycle.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/admin/sources/${id}/edit`}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-violet-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700"
              >
                <Pencil className="mr-2 size-4" />
                Edit Source
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
        entityLabel="Source"
        item={item}
        loading={loading}
      />
    </main>
  );
}

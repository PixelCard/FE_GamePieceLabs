"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { EntityCrudForm } from "@/features/admin/components/EntityCrudUi";
import {
  getCategoryByIdAsync,
  updateCategoryAsync,
} from "@/features/admin/categories/services/categories-api";

type EditCategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getCategoryByIdAsync(id);
        setName(result.categoryName);
        setNote(result.categoryNote ?? "");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cannot load category");
      } finally {
        setLoading(false);
      }
    };

    void loadCategory();
  }, [id]);

  const handleSave = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Category name is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateCategoryAsync(id, {
        categoryName: trimmedName,
        categoryNote: note.trim() || undefined,
      });
      router.push(`/admin/categories/${id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update category failed");
    } finally {
      setSaving(false);
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
              href="/admin/categories"
              className="inline-flex items-center gap-1 font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Categories
            </Link>
            <span>/</span>
            <span>Edit</span>
          </nav>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-3xl">
            {loading ? "Loading category..." : "Edit Category"}
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update category name and internal note.
          </p>
        </div>
      </header>

      <EntityCrudForm
        theme="categories"
        title="Category Information"
        description="Update the category record used for product classification."
        nameLabel="Category Name"
        noteLabel="Category Note"
        name={name}
        note={note}
        saving={saving || loading}
        error={error}
        onNameChange={setName}
        onNoteChange={setNote}
        onSave={() => void handleSave()}
        onCancel={() => router.push(`/admin/categories/${id}`)}
        submitLabel="Save Changes"
      />
    </main>
  );
}

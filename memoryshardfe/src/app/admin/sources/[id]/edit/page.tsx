"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { EntityCrudForm } from "@/features/admin/components/EntityCrudUi";
import {
  getSourceByIdAsync,
  updateSourceAsync,
} from "@/features/admin/sources/services/sources-api";

type EditSourcePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditSourcePage({ params }: EditSourcePageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSource = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getSourceByIdAsync(id);
        setName(result.souceName);
        setNote(result.souceNote ?? "");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cannot load source");
      } finally {
        setLoading(false);
      }
    };

    void loadSource();
  }, [id]);

  const handleSave = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Source name is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateSourceAsync(id, {
        souceName: trimmedName,
        souceNote: note.trim() || undefined,
      });
      router.push(`/admin/sources/${id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update source failed");
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
              href="/admin/sources"
              className="inline-flex items-center gap-1 font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Sources
            </Link>
            <span>/</span>
            <span>Edit</span>
          </nav>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-3xl">
            {loading ? "Loading source..." : "Edit Source"}
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update source display name and internal note.
          </p>
        </div>
      </header>

      <EntityCrudForm
        theme="sources"
        title="Source Information"
        description="Update the source record used by product relations."
        nameLabel="Source Name"
        noteLabel="Source Note"
        name={name}
        note={note}
        saving={saving || loading}
        error={error}
        onNameChange={setName}
        onNoteChange={setNote}
        onSave={() => void handleSave()}
        onCancel={() => router.push(`/admin/sources/${id}`)}
        submitLabel="Save Changes"
      />
    </main>
  );
}

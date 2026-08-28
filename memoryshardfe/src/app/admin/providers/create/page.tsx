"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { EntityCrudForm } from "@/features/admin/components/EntityCrudUi";
import { createProviderAsync } from "@/features/admin/providers/services/providers-api";

export default function CreateProviderPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Provider name is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const created = await createProviderAsync({
        providerName: trimmedName,
        providerNote: note.trim() || undefined,
      });
      router.push(`/admin/providers/${created.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Create provider failed");
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
              href="/admin/providers"
              className="inline-flex items-center gap-1 font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Providers
            </Link>
            <span>/</span>
            <span>Create</span>
          </nav>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-3xl">
            Create Provider
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Add a new provider or brand reference used by product records.
          </p>
        </div>
      </header>

      <EntityCrudForm
        theme="providers"
        title="Provider Information"
        description="Create the provider display name and optional internal note."
        nameLabel="Provider Name"
        noteLabel="Provider Note"
        name={name}
        note={note}
        saving={saving}
        error={error}
        onNameChange={setName}
        onNoteChange={setNote}
        onSave={() => void handleSave()}
        onCancel={() => router.push("/admin/providers")}
        submitLabel="Create Provider"
      />
    </main>
  );
}

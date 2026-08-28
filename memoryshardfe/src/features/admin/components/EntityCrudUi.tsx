"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import {
  AdminEmptyState,
  AdminError,
  AdminPageHero,
  AdminPanel,
  AdminStatCard,
  AdminThemeKey,
  TableShell,
  inputClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass,
  textareaClass,
} from "./Admin-Ui";

export type CrudEntityItem = {
  id: string;
  name: string;
  note?: string | null;
};

type HeaderProps = {
  theme: AdminThemeKey;
  eyebrow: string;
  title: string;
  description: string;
  createHref: string;
  createLabel: string;
  icon: string;
};

export function EntityCrudHero(props: HeaderProps) {
  return (
    <AdminPageHero
      theme={props.theme}
      eyebrow={props.eyebrow}
      title={props.title}
      description={props.description}
      icon={props.icon}
      action={
        <Link
          href={props.createHref}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 active:translate-y-px"
        >
          <Plus className="mr-2 size-4" />
          {props.createLabel}
        </Link>
      }
    />
  );
}

export function EntityCrudStats({
  theme,
  items,
  filteredItems,
  loading,
  entityLabel,
  icon,
}: {
  theme: AdminThemeKey;
  items: CrudEntityItem[];
  filteredItems: CrudEntityItem[];
  loading: boolean;
  entityLabel: string;
  icon: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <AdminStatCard
        theme={theme}
        icon={icon}
        label={`Total ${entityLabel}`}
        value={items.length}
        hint="All records"
      />
      <AdminStatCard
        theme={theme}
        icon="⌕"
        label="Visible Result"
        value={filteredItems.length}
        hint="Current search result"
      />
      <AdminStatCard
        theme={theme}
        icon="✓"
        label="Status"
        value={loading ? "Loading" : "Ready"}
        hint="API state"
      />
    </div>
  );
}

export function EntityCrudListPanel({
  theme,
  title,
  description,
  search,
  onSearchChange,
  onRefresh,
  createHref,
  createLabel,
  searchPlaceholder,
  error,
  children,
}: {
  theme: AdminThemeKey;
  title: string;
  description: string;
  search: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  createHref: string;
  createLabel: string;
  searchPlaceholder: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <AdminPanel theme={theme}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
              {title}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
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
              href={createHref}
              className={`inline-flex h-10 items-center justify-center rounded-lg px-3 text-sm font-medium text-white shadow-sm transition active:translate-y-px ${primaryButtonClass(theme)}`}
            >
              <Plus className="mr-2 size-4" />
              {createLabel}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-3 dark:bg-white/[0.04] md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className={`h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white ${inputClass(theme).split(" ").filter((x) => !x.startsWith("h-11")).join(" ")}`}
            />
          </div>
        </div>

        {error ? <AdminError message={error} /> : null}

        {children}
      </div>
    </AdminPanel>
  );
}

export function EntityCrudTable({
  theme,
  items,
  loading,
  deletingId,
  routeBase,
  entityLabel,
  emptyDescription,
  onDelete,
}: {
  theme: AdminThemeKey;
  items: CrudEntityItem[];
  loading: boolean;
  deletingId: string | null;
  routeBase: string;
  entityLabel: string;
  emptyDescription: string;
  onDelete: (item: CrudEntityItem) => void;
}) {
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

  if (items.length === 0) {
    return (
      <AdminEmptyState
        theme={theme}
        icon="•"
        title={`No ${entityLabel.toLowerCase()} found`}
        description={emptyDescription}
      />
    );
  }

  return (
    <TableShell>
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-white/[0.04] dark:text-slate-400">
          <tr>
            <th className="px-5 py-4">Name</th>
            <th className="px-5 py-4">Note</th>
            <th className="px-5 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-white/10">
          {items.map((item) => (
            <tr
              key={item.id}
              className="transition hover:bg-slate-50 dark:hover:bg-white/[0.04]"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-950 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.id}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                {item.note || "No note"}
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`${routeBase}/${item.id}`}
                    className="grid size-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <Eye className="size-4" />
                  </Link>
                  <Link
                    href={`${routeBase}/${item.id}/edit`}
                    className="grid size-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    disabled={deletingId === item.id}
                    className="grid size-8 place-items-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-300 dark:hover:bg-red-500/10 dark:hover:text-red-200"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  );
}

export function EntityCrudForm({
  theme,
  title,
  description,
  nameLabel,
  noteLabel,
  name,
  note,
  saving,
  error,
  onNameChange,
  onNoteChange,
  onSave,
  onCancel,
  submitLabel,
}: {
  theme: AdminThemeKey;
  title: string;
  description: string;
  nameLabel: string;
  noteLabel: string;
  name: string;
  note: string;
  saving: boolean;
  error: string;
  onNameChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  submitLabel: string;
}) {
  return (
    <AdminPanel theme={theme} title={title} description={description}>
      <div className="space-y-6">
        {error ? <AdminError message={error} /> : null}

        <label className="block">
          <span className={labelClass}>{nameLabel}</span>
          <input
            className={inputClass(theme)}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </label>

        <label className="block">
          <span className={labelClass}>{noteLabel}</span>
          <textarea
            className={textareaClass(theme)}
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
          />
        </label>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-white/10 sm:flex-row">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className={`${primaryButtonClass(theme)} flex-1`}
          >
            {saving ? "Saving..." : submitLabel}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className={secondaryButtonClass}
          >
            Cancel
          </button>
        </div>
      </div>
    </AdminPanel>
  );
}

export function EntityCrudDetailCard({
  entityLabel,
  item,
  loading,
}: {
  entityLabel: string;
  item: CrudEntityItem | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
        <div className="space-y-4">
          <div className="h-8 w-52 animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
          <div className="h-20 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/10 dark:bg-[#0b1020]">
        <h3 className="text-base font-semibold text-slate-950 dark:text-white">
          {entityLabel} not found
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The requested record could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
      <div className="border-b border-slate-200 p-6 dark:border-white/10">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {item.name}
        </h2>
        <p className="mt-1 break-all text-sm text-slate-500 dark:text-slate-400">
          {item.id}
        </p>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        <InfoCard label="Name" value={item.name} />
        <InfoCard label="Note" value={item.note || "No note"} />
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.04]">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}

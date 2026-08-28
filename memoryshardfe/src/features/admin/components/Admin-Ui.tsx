"use client";

import type { ReactNode } from "react";

export type AdminThemeKey =
  | "categories"
  | "products"
  | "productImages"
  | "providers"
  | "sources";

type ThemeConfig = {
  gradient: string;
  glow: string;
  iconBg: string;
  softBg: string;
  softText: string;
  softBorder: string;
  solidBg: string;
  solidHover: string;
  solidShadow: string;
  ring: string;
  tableHead: string;
};

export const adminThemes: Record<AdminThemeKey, ThemeConfig> = {
  categories: {
    gradient: "from-sky-600 via-blue-600 to-cyan-600",
    glow: "bg-sky-300",
    iconBg: "bg-sky-500/20 text-white ring-1 ring-white/20",
    softBg: "bg-sky-50 dark:bg-sky-500/10",
    softText: "text-sky-700 dark:text-sky-300",
    softBorder: "border-sky-200 dark:border-sky-500/20",
    solidBg: "bg-sky-600",
    solidHover: "hover:bg-sky-700",
    solidShadow: "shadow-sky-600/25",
    ring: "focus:border-sky-500 focus:ring-sky-500/20",
    tableHead:
      "bg-sky-50/70 text-sky-800 dark:bg-sky-500/10 dark:text-sky-200",
  },
  products: {
    gradient: "from-blue-600 via-indigo-600 to-violet-600",
    glow: "bg-blue-300",
    iconBg: "bg-blue-500/20 text-white ring-1 ring-white/20",
    softBg: "bg-blue-50 dark:bg-blue-500/10",
    softText: "text-blue-700 dark:text-blue-300",
    softBorder: "border-blue-200 dark:border-blue-500/20",
    solidBg: "bg-blue-600",
    solidHover: "hover:bg-blue-700",
    solidShadow: "shadow-blue-600/25",
    ring: "focus:border-blue-500 focus:ring-blue-500/20",
    tableHead:
      "bg-blue-50/70 text-blue-800 dark:bg-blue-500/10 dark:text-blue-200",
  },
  productImages: {
    gradient: "from-indigo-600 via-purple-600 to-fuchsia-600",
    glow: "bg-fuchsia-300",
    iconBg: "bg-fuchsia-500/20 text-white ring-1 ring-white/20",
    softBg: "bg-indigo-50 dark:bg-indigo-500/10",
    softText: "text-indigo-700 dark:text-indigo-300",
    softBorder: "border-indigo-200 dark:border-indigo-500/20",
    solidBg: "bg-indigo-600",
    solidHover: "hover:bg-indigo-700",
    solidShadow: "shadow-indigo-600/25",
    ring: "focus:border-indigo-500 focus:ring-indigo-500/20",
    tableHead:
      "bg-indigo-50/70 text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-200",
  },
  providers: {
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    glow: "bg-emerald-300",
    iconBg: "bg-emerald-500/20 text-white ring-1 ring-white/20",
    softBg: "bg-emerald-50 dark:bg-emerald-500/10",
    softText: "text-emerald-700 dark:text-emerald-300",
    softBorder: "border-emerald-200 dark:border-emerald-500/20",
    solidBg: "bg-emerald-600",
    solidHover: "hover:bg-emerald-700",
    solidShadow: "shadow-emerald-600/25",
    ring: "focus:border-emerald-500 focus:ring-emerald-500/20",
    tableHead:
      "bg-emerald-50/70 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200",
  },
  sources: {
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    glow: "bg-amber-200",
    iconBg: "bg-orange-500/20 text-white ring-1 ring-white/20",
    softBg: "bg-orange-50 dark:bg-orange-500/10",
    softText: "text-orange-700 dark:text-orange-300",
    softBorder: "border-orange-200 dark:border-orange-500/20",
    solidBg: "bg-orange-500",
    solidHover: "hover:bg-orange-600",
    solidShadow: "shadow-orange-500/25",
    ring: "focus:border-orange-500 focus:ring-orange-500/20",
    tableHead:
      "bg-orange-50/70 text-orange-800 dark:bg-orange-500/10 dark:text-orange-200",
  },
};

export const labelClass =
  "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200";

export const helperClass =
  "mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400";

export const fieldSectionClass =
  "space-y-4 border-t border-slate-200 pt-5 first:border-t-0 first:pt-0 dark:border-white/10";

export function inputClass(theme: AdminThemeKey = "products") {
  return `h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-2 ${adminThemes[theme].ring} dark:border-white/10 dark:bg-white/5 dark:text-white`;
}

export function textareaClass(theme: AdminThemeKey = "products") {
  return `min-h-[112px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-2 ${adminThemes[theme].ring} dark:border-white/10 dark:bg-white/5 dark:text-white`;
}

export function primaryButtonClass(theme: AdminThemeKey = "products") {
  const current = adminThemes[theme];

  return `inline-flex h-11 items-center justify-center rounded-xl ${current.solidBg} px-4 text-sm font-medium text-white shadow-sm ${current.solidShadow} transition ${current.solidHover} active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60`;
}

export const secondaryButtonClass =
  "inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10";

export const dangerButtonClass =
  "inline-flex h-10 items-center justify-center rounded-xl border border-red-200 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/30 dark:bg-white/5 dark:text-red-300 dark:hover:bg-red-500/10";

type AdminPageHeroProps = {
  theme: AdminThemeKey;
  eyebrow: string;
  title: string;
  description: string;
  icon?: string;
  action?: ReactNode;
};

export function AdminPageHero({
  theme,
  eyebrow,
  title,
  description,
  icon = "◇",
  action,
}: AdminPageHeroProps) {
  const current = adminThemes[theme];

  return (
    <section
      className={`relative overflow-hidden rounded-[28px] bg-gradient-to-r ${current.gradient} p-6 text-white shadow-sm ${current.solidShadow}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div
          className={`absolute -left-12 -top-16 h-52 w-52 rounded-full ${current.glow} blur-3xl`}
        />
        <div className="absolute right-20 top-8 h-32 w-32 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-black/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`grid size-12 shrink-0 place-items-center rounded-2xl text-xl ${current.iconBg}`}
          >
            {icon}
          </div>

          <div>
            <p className="text-sm font-medium text-white/80">{eyebrow}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85">
              {description}
            </p>
          </div>
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </section>
  );
}

type AdminStatCardProps = {
  theme: AdminThemeKey;
  label: string;
  value: string | number;
  hint?: string;
  icon?: string;
};

export function AdminStatCard({
  theme,
  label,
  value,
  hint,
  icon = "•",
}: AdminStatCardProps) {
  const current = adminThemes[theme];

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-[2px] hover:shadow-md dark:border-white/10 dark:bg-[#0b1020]">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {value}
            </p>
          </div>

          <div
            className={`grid size-11 place-items-center rounded-2xl text-lg ${current.softBg} ${current.softText}`}
          >
            {icon}
          </div>
        </div>

        {hint ? (
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            {hint}
          </p>
        ) : null}
      </div>

      <div className={`h-1.5 bg-gradient-to-r ${current.gradient}`} />
    </div>
  );
}

type AdminPanelProps = {
  title?: string;
  description?: string;
  theme?: AdminThemeKey;
  right?: ReactNode;
  children: ReactNode;
};

export function AdminPanel({
  title,
  description,
  theme = "products",
  right,
  children,
}: AdminPanelProps) {
  const current = adminThemes[theme];

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
      {(title || description || right) && (
        <div className="border-b border-slate-200 p-6 dark:border-white/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              {title ? (
                <div className="flex items-center gap-3">
                  <span
                    className={`h-6 w-1.5 rounded-full bg-gradient-to-b ${current.gradient}`}
                  />
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                    {title}
                  </h2>
                </div>
              ) : null}

              {description ? (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              ) : null}
            </div>

            {right ? <div className="shrink-0">{right}</div> : null}
          </div>
        </div>
      )}

      <div className="p-6">{children}</div>
    </section>
  );
}

type AdminToolbarProps = {
  theme: AdminThemeKey;
  left?: ReactNode;
  right?: ReactNode;
};

export function AdminToolbar({ theme, left, right }: AdminToolbarProps) {
  const current = adminThemes[theme];

  return (
    <div
      className={`rounded-[24px] border p-4 ${current.softBorder} ${current.softBg}`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-center">
          {left}
        </div>

        <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
          {right}
        </div>
      </div>
    </div>
  );
}

type AdminEmptyStateProps = {
  theme: AdminThemeKey;
  title: string;
  description: string;
  icon?: string;
  action?: ReactNode;
};

export function AdminEmptyState({
  theme,
  title,
  description,
  icon = "📦",
  action,
}: AdminEmptyStateProps) {
  const current = adminThemes[theme];

  return (
    <div className="px-6 py-14 text-center">
      <div
        className={`mx-auto grid size-14 place-items-center rounded-2xl text-2xl ${current.softBg} ${current.softText}`}
      >
        {icon}
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-950 dark:text-white">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function AdminError({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
      {message}
    </div>
  );
}

export function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
        {title}
      </h3>

      {description ? (
        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
      {children}
    </div>
  );
}

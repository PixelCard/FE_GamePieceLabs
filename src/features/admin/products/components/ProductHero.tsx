"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

type ProductHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  actionVariant?: "primary" | "secondary";
};

export default function ProductHero({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  actionVariant = "primary",
}: ProductHeroProps) {
  const isSecondary = actionVariant === "secondary";

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950/80 to-violet-900/70" />

      <div className="absolute inset-0 opacity-45">
        <div className="absolute inset-x-10 top-8 h-32 rounded-3xl bg-white/20 blur-3xl" />
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-indigo-500 blur-3xl" />
        <div className="absolute -left-20 bottom-0 size-72 rounded-full bg-violet-500 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {eyebrow}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">
            {description}
          </p>
        </div>

        {actionHref && actionLabel ? (
          <Link
            href={actionHref}
            className={[
              "inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold shadow-sm transition active:translate-y-px",
              isSecondary
                ? "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
                : "bg-white text-indigo-700 hover:bg-indigo-50",
            ].join(" ")}
          >
            {isSecondary ? (
              <ArrowLeft className="mr-2 size-4" />
            ) : (
              <Plus className="mr-2 size-4" />
            )}
            {actionLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
"use client";

import { Bell, HelpCircle, Search, Settings } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-6">
        <div>
          <p className="text-lg font-semibold text-indigo-700">Nexus Admin</p>
        </div>

        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

          <input
            placeholder="Search products, orders..."
            className="h-10 w-full rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="grid size-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-950">
            <Bell className="size-4" />
          </button>

          <button className="grid size-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-950">
            <Settings className="size-4" />
          </button>

          <button className="grid size-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-950">
            <HelpCircle className="size-4" />
          </button>

          <div className="ml-2 grid size-9 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
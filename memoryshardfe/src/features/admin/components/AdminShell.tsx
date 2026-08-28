"use client";

import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-[#050816] dark:text-slate-100">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminTopbar />

        <main className="no-scrollbar h-[calc(100vh-64px)] overflow-y-auto px-6 py-6">
          <div className="w-full">{children}</div>
        </main> 
        </div>
      </div>
    </div>
  );
}
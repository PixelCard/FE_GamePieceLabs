"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    window.location.href = "/api/auth/login";
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 items-center justify-center px-6 py-12">
      <div className="w-full rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Redirecting...</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Redirecting to secure login flow.
        </p>
      </div>
    </main>
  );
}

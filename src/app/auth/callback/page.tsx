import Link from "next/link";

type CallbackProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CallbackPage({ searchParams }: CallbackProps) {
  const params = (await searchParams) ?? {};
  const statusParam = params.status;
  const messageParam = params.message;

  const status =
    typeof statusParam === "string" ? statusParam : Array.isArray(statusParam) ? statusParam[0] : "";
  const message =
    typeof messageParam === "string"
      ? messageParam
      : Array.isArray(messageParam)
      ? messageParam[0]
      : undefined;
  const ok = status === "ok";

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 items-center justify-center px-6 py-12">
      <div className="w-full rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Authentication Result</h1>
        <p className={`mt-3 text-sm ${ok ? "text-neutral-700" : "text-red-600"}`}>
          {ok ? "Login success. Session cookie is set." : message ?? "Login failed."}
        </p>
        <div className="mt-5 flex gap-4">
          <Link className="text-sm font-medium text-blue-700 underline" href="/">
            Go Home
          </Link>
          <Link
            className="text-sm font-medium text-blue-700 underline"
            href="/routes/auth_routes/session"
          >
            Check Session API
          </Link>
        </div>
      </div>
    </main>
  );
}

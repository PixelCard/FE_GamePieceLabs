"use client";

import Image from "next/image";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  ImageOff,
  Loader2,
  Monitor,
  UploadCloud,
  X,
} from "lucide-react";

import { uploadProductImageAsync } from "@/features/admin/product-images/services/product-images-api";
import type { ProductImageDto } from "@/features/admin/product-images/types/product-images.type";

export default function AdminProductImagesPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [productId, setProductId] = useState("");
  const [altText, setAltText] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [isPrimary, setIsPrimary] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ProductImageDto | null>(null);
  const [showEngineBar, setShowEngineBar] = useState(true);

  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const activePreviewUrl = previewUrl || result?.publicUrl || "";

  const chooseFile = (selectedFile?: File | null) => {
    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only JPG, PNG and WEBP files are supported.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Maximum image size is 5MB.");
      return;
    }

    setFile(selectedFile);
    setResult(null);
    setError("");
    setShowEngineBar(true);
  };

  const onUpload = async () => {
    if (!productId.trim()) {
      setError("Product ID is required.");
      return;
    }

    if (!file) {
      setError("Please choose an image file.");
      return;
    }

    setUploading(true);
    setError("");
    setResult(null);
    setShowEngineBar(true);

    try {
      const uploaded = await uploadProductImageAsync({
        productId: productId.trim(),
        file,
        isPrimary,
        displayOrder: Number(displayOrder),
        altText: altText.trim(),
      });

      setResult(uploaded);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const clearForm = () => {
    setProductId("");
    setAltText("");
    setDisplayOrder("0");
    setIsPrimary(false);
    setFile(null);
    setResult(null);
    setError("");
  };

  return (
    <main className="w-full space-y-7 px-12 pb-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 px-7 py-7 text-white shadow-sm">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-24 size-80 rotate-45 bg-white/20" />
          <div className="absolute right-24 top-0 h-full w-56 rotate-[-35deg] bg-white/10" />
        </div>

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/95">
              Admin / Product Images
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              Media Workspace
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/85">
              Upload product visuals, preview local assets and validate metadata
              before publishing to the enterprise catalog.
            </p>
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-base font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50 active:translate-y-px"
          >
            <UploadCloud className="size-5" />
            Upload New
          </button>
        </div>
      </section>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      <section className="grid gap-12 xl:grid-cols-[380px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="h-7 w-1 rounded-full bg-indigo-600" />
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Upload Panel
            </h2>
          </div>

          <div className="mt-5 border-t border-slate-200 pt-6">
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => chooseFile(e.target.files?.[0] ?? null)}
            />

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                chooseFile(e.dataTransfer.files?.[0] ?? null);
              }}
              className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-white px-5 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40"
            >
              <span className="grid size-16 place-items-center rounded-full bg-indigo-100 text-indigo-700">
                <UploadCloud className="size-7" />
              </span>

              <span className="mt-5 text-xl font-semibold text-slate-950">
                Drag and drop file
              </span>

              <span className="mt-2 text-sm text-slate-500">
                or click to browse from device
              </span>

              <span className="mt-5 max-w-[220px] text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Supported: JPG, PNG, WEBP Max 5MB
              </span>
            </button>

            <div className="mt-6 space-y-5">
              <label className="block space-y-2">
                <span className={labelClass}>Product ID</span>
                <input
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="Product GUID"
                  className={inputClass}
                />
                <span className="block text-xs italic tracking-[0.18em] text-slate-500">
                  Readonly GUID for system tracking.
                </span>
              </label>

              <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
                <label className="block space-y-2">
                  <span className={labelClass}>Display Order</span>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className="flex items-end">
                  <span className="flex h-10 w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={isPrimary}
                      onChange={(e) => setIsPrimary(e.target.checked)}
                      className="size-5 rounded border-slate-300"
                    />
                    Set as Primary
                  </span>
                </label>
              </div>

              <label className="block space-y-2">
                <span className={labelClass}>Alt Text</span>
                <textarea
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe the image for accessibility..."
                  className="min-h-[90px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/15"
                />
              </label>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-[1fr_120px]">
              <button
                type="button"
                onClick={() => void onUpload()}
                disabled={uploading}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-500 px-5 text-base font-semibold text-white shadow-sm transition hover:brightness-105 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Image"
                )}
              </button>

              <button
                type="button"
                onClick={clearForm}
                disabled={uploading}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-base font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-7 w-1 rounded-full bg-fuchsia-600" />
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                Preview & Gallery
              </h2>
            </div>

            <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
              Sync Active
            </span>
          </div>

          <div className="mt-5 border-t border-slate-200 pt-6">
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 p-6">
              {activePreviewUrl ? (
                <div className="flex h-full w-full items-center justify-center">
                  <Image
                    src={activePreviewUrl}
                    alt={altText || result?.altText || "Selected product image"}
                    width={800}
                    height={800}
                    unoptimized
                    className="max-h-[260px] w-full object-contain"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <div className="mx-auto grid size-20 place-items-center rounded-2xl bg-slate-200 text-slate-500">
                    <ImageOff className="size-9" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-600">
                    No Image Selected
                  </h3>

                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                    Choose a file from the upload panel to see how it will
                    appear in your storefront.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Related Media ({activePreviewUrl ? "1" : "0"})
              </p>

              <button
                type="button"
                className="text-sm font-semibold text-indigo-700 transition hover:text-indigo-900"
              >
                Manage All
              </button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              <GalleryTile active imageUrl={activePreviewUrl} />
              <GalleryTile imageUrl="" />
              <GalleryTile imageUrl="" />
              <GalleryTile imageUrl="" />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <MediaInfoCard
                label="Selected File"
                value={file?.name || "No file selected"}
              />

              <MediaInfoCard
                label="Upload State"
                value={uploading ? "Uploading" : result ? "Uploaded" : "Ready"}
              />

              <MediaInfoCard
                label="Primary Image"
                value={isPrimary ? "Enabled" : "Disabled"}
              />
            </div>

            {result ? (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="size-4" />
                  Upload success
                </div>

                <dl className="mt-4 grid gap-3 md:grid-cols-2">
                  <InfoItem label="Image ID" value={result.id} />
                  <InfoItem label="Public URL" value={result.publicUrl || "-"} />
                  <InfoItem label="Primary" value={String(result.isPrimary)} />
                  <InfoItem label="Order" value={String(result.displayOrder)} />
                </dl>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {showEngineBar ? (
        <div className="fixed bottom-8 left-1/2 z-50 flex w-[min(900px,calc(100vw-48px))] -translate-x-1/2 items-center justify-between gap-4 rounded-full bg-zinc-900/95 px-5 py-3 text-white shadow-2xl backdrop-blur">
          <div className="flex min-w-0 items-center gap-3">
            <span className="size-2.5 rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-white/80">
              System Engine:
            </span>
            <span className="truncate text-base font-semibold">
              {uploading
                ? "Uploading image..."
                : result
                  ? "Upload completed"
                  : "Ready to upload"}
            </span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <span>Upload speed: 45MB/s</span>
            <span>Last synced 2m ago</span>
          </div>

          <button
            type="button"
            onClick={() => setShowEngineBar(false)}
            className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}
    </main>
  );
}

function GalleryTile({
  imageUrl,
  active,
}: {
  imageUrl: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={[
        "flex h-20 items-center justify-center overflow-hidden rounded-xl border bg-slate-100 transition",
        active
          ? "border-indigo-600 ring-2 ring-indigo-600/20"
          : "border-slate-200 hover:border-indigo-300",
      ].join(" ")}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Related media"
          width={320}
          height={320}
          unoptimized
          className="h-full w-full object-cover"
        />
      ) : (
        <Monitor className="size-6 text-slate-400" />
      )}
    </button>
  );
}

function MediaInfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 truncate text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-700/70">
        {label}
      </dt>
      <dd className="mt-1 break-all font-medium">{value}</dd>
    </div>
  );
}

const labelClass =
  "text-xs font-semibold uppercase tracking-[0.22em] text-slate-500";

const inputClass =
  "h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/15 disabled:cursor-not-allowed disabled:bg-slate-50";


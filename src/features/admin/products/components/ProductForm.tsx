"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createAdminProductAsync,
  updateAdminProductAsync,
} from "@/features/admin/products/services/products-crud-api";
import { getCategoriesAsync } from "@/features/admin/categories/services/categories-api";
import { getProvidersAsync } from "@/features/admin/providers/services/providers-api";
import { getSourcesAsync } from "@/features/admin/sources/services/sources-api";
import type {
  CreateUpdateProductInput,
  ProductCrudDto,
} from "@/features/admin/products/types/products-crud.type";
import type { CategoryDto } from "@/features/admin/categories/types/categories.type";
import type { ProviderDto } from "@/features/admin/providers/types/providers.type";
import type { ProductSouceDto } from "@/features/admin/sources/types/sources.type";

type ProductFormProps = {
  mode: "create" | "edit";
  productId?: string;
  product?: ProductCrudDto | null;
  loading?: boolean;
};

type ProductFormState = {
  productName: string;
  orginalPrice: string;
  discountPercentage: string;
  quantity: string;
  productNote: string;
  scale: string;
  status: string;
  categoryId: string;
  providerId: string;
  productSouceId: string;
};

const initialForm: ProductFormState = {
  productName: "",
  orginalPrice: "0",
  discountPercentage: "",
  quantity: "1",
  productNote: "",
  scale: "",
  status: "1",
  categoryId: "",
  providerId: "",
  productSouceId: "",
};

function createFormState(product?: ProductCrudDto | null): ProductFormState {
  if (!product) return initialForm;

  return {
    productName: product.productName ?? "",
    orginalPrice: String(product.orginalPrice ?? "0"),
    discountPercentage:
      product.discountPercentage === null ||
      product.discountPercentage === undefined
        ? ""
        : String(product.discountPercentage),
    quantity: String(product.quantity ?? "1"),
    productNote: product.productNote ?? "",
    scale: product.scale ?? "",
    status: String(product.status ?? "1"),
    categoryId: product.categoryId ?? "",
    providerId: product.providerId ?? "",
    productSouceId: product.productSouceId ?? "",
  };
}

export default function ProductForm({
  mode,
  productId,
  product,
  loading = false,
}: ProductFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<ProductFormState>(() =>
    createFormState(product),
  );
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [providers, setProviders] = useState<ProviderDto[]>([]);
  const [sources, setSources] = useState<ProductSouceDto[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = mode === "edit";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(createFormState(product));
  }, [product]);

  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [categoryResult, providerResult, sourceResult] =
          await Promise.all([
            getCategoriesAsync(),
            getProvidersAsync(),
            getSourcesAsync(),
          ]);

        setCategories(categoryResult.items ?? []);
        setProviders(providerResult.items ?? []);
        setSources(sourceResult.items ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cannot load relation data");
      }
    };

    void loadLookups();
  }, []);

  const updateForm = (key: keyof ProductFormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const save = async () => {
    if (!form.productName.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!form.categoryId.trim()) {
      setError("Category is required.");
      return;
    }

    if (!form.providerId.trim()) {
      setError("Provider is required.");
      return;
    }

    if (!form.productSouceId.trim()) {
      setError("Product source is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload: CreateUpdateProductInput = {
        productName: form.productName.trim(),
        orginalPrice: Number(form.orginalPrice),
        discountPercentage:
          form.discountPercentage === ""
            ? null
            : Number(form.discountPercentage),
        quantity: Number(form.quantity),
        productNote: form.productNote.trim() || null,
        scale: form.scale.trim() || null,
        status: Number(form.status),
        categoryId: form.categoryId.trim(),
        providerId: form.providerId.trim(),
        productSouceId: form.productSouceId.trim(),
      };

      if (mode === "create") {
        await createAdminProductAsync(payload);
      }

      if (mode === "edit") {
        if (!productId) {
          setError("Missing product ID.");
          return;
        }

        await updateAdminProductAsync(productId, payload);
      }

      router.push("/admin/products");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ProductFormSkeleton />;
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
        <FormRow
          title="Basic Information"
          description="Name, scale and display status."
        >
          <div className="grid gap-4">
            <Field label="Product name" required>
              <input
                value={form.productName}
                onChange={(e) => updateForm("productName", e.target.value)}
                placeholder="Example: Gundam RX-78-2"
                className={inputClass}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,260px)_minmax(0,260px)]">
              <Field label="Scale">
                <input
                  value={form.scale}
                  onChange={(e) => updateForm("scale", e.target.value)}
                  placeholder="Example: 1:144"
                  className={inputClass}
                />
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => updateForm("status", e.target.value)}
                  className={inputClass}
                >
                  <option value="1">Draft</option>
                  <option value="2">Active</option>
                  <option value="3">Hidden</option>
                  <option value="4">Archived</option>
                </select>
              </Field>
            </div>
          </div>
        </FormRow>

        <FormRow
          title="Pricing & Stock"
          description="Numeric fields stay compact to reduce wasted space."
        >
          <div className="grid gap-4 sm:grid-cols-[minmax(0,200px)_minmax(0,180px)_minmax(0,160px)]">
            <Field label="Original price">
              <input
                type="number"
                value={form.orginalPrice}
                onChange={(e) => updateForm("orginalPrice", e.target.value)}
                placeholder="10000"
                className={inputClass}
              />
            </Field>

            <Field label="Discount %">
              <input
                type="number"
                value={form.discountPercentage}
                onChange={(e) =>
                  updateForm("discountPercentage", e.target.value)
                }
                placeholder="20"
                className={inputClass}
              />
            </Field>

            <Field label="Quantity">
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => updateForm("quantity", e.target.value)}
                placeholder="10"
                className={inputClass}
              />
            </Field>
          </div>
        </FormRow>

        <FormRow
          title="Relations"
          description="Select category, provider and product source by name."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Category" required>
              <select
                value={form.categoryId}
                onChange={(e) => updateForm("categoryId", e.target.value)}
                className={inputClass}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Provider" required>
              <select
                value={form.providerId}
                onChange={(e) => updateForm("providerId", e.target.value)}
                className={inputClass}
              >
                <option value="">Select provider</option>
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.providerName}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Source" required>
              <select
                value={form.productSouceId}
                onChange={(e) => updateForm("productSouceId", e.target.value)}
                className={inputClass}
              >
                <option value="">Select source</option>
                {sources.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.souceName}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </FormRow>

        <FormRow
          title="Internal Note"
          description="Private note for admin catalog maintenance."
        >
          <Field label="Product note">
            <textarea
              value={form.productNote}
              onChange={(e) => updateForm("productNote", e.target.value)}
              placeholder="Add internal product note..."
              className={textareaClass}
            />
          </Field>
        </FormRow>

        <div className="flex items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
            {isEdit
              ? "Review changes before updating this product."
              : "Review information before creating this product."}
          </p>

          <div className="ml-auto flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              disabled={saving}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-medium text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : mode === "create"
                  ? "Create Product"
                  : "Update Product"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function FormRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 border-b border-slate-200 px-6 py-6 last:border-b-0 dark:border-white/10 xl:grid-cols-[220px_minmax(0,1fr)]">
      <div>
        <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
          {title}
        </h2>

        <p className="mt-1 max-w-[220px] text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div className="w-full max-w-[820px]">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function ProductFormSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
      {[1, 2, 3, 4].map((item) => (
        <section
          key={item}
          className="grid gap-6 border-b border-slate-200 px-6 py-6 last:border-b-0 dark:border-white/10 xl:grid-cols-[220px_minmax(0,1fr)]"
        >
          <div>
            <div className="h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
            <div className="mt-2 h-4 w-48 animate-pulse rounded bg-slate-100 dark:bg-white/10" />
          </div>

          <div className="w-full max-w-[820px] space-y-4">
            <div className="h-10 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
            <div className="h-10 w-1/2 animate-pulse rounded-xl bg-slate-100 dark:bg-white/10" />
          </div>
        </section>
      ))}
    </div>
  );
}

const inputClass =
  "h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/15 disabled:cursor-not-allowed disabled:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500";

const textareaClass =
  "min-h-[110px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/15 disabled:cursor-not-allowed disabled:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500";
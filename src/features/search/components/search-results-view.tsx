"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Search } from "lucide-react";

import { ProductList } from "@/components/shared/product-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getProductTypeCounts,
  searchProducts,
} from "@/features/search/lib/search-products";
import type {
  SearchProductType,
  SearchSortOption,
} from "@/features/search/types/search-product";
import { formatCurrency } from "@/utils/format-currency";
import { cn } from "@/utils/cn";

type SearchResultsViewProps = {
  initialQuery: string;
};

const priceRanges = [
  { id: "all", label: "Tất cả mức giá", minPrice: 0, maxPrice: Number.POSITIVE_INFINITY },
  { id: "under-500", label: "Dưới 500.000 đ", minPrice: 0, maxPrice: 500_000 },
  { id: "500-1000", label: "500.000 đ - 1.000.000 đ", minPrice: 500_000, maxPrice: 1_000_000 },
  { id: "over-1000", label: "Trên 1.000.000 đ", minPrice: 1_000_000, maxPrice: Number.POSITIVE_INFINITY },
] as const;

const sortOptions: { value: SearchSortOption; label: string }[] = [
  { value: "relevance", label: "Liên quan nhất" },
  { value: "price-asc", label: "Giá thấp đến cao" },
  { value: "price-desc", label: "Giá cao đến thấp" },
  { value: "name-asc", label: "Tên A-Z" },
];

function buildSearchHref(query: string): string {
  const normalizedQuery = query.trim();

  return normalizedQuery ? `/search?q=${encodeURIComponent(normalizedQuery)}` : "/search";
}

export function SearchResultsView({ initialQuery }: SearchResultsViewProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [productType, setProductType] = useState<SearchProductType | "all">("all");
  const [priceRangeId, setPriceRangeId] = useState<(typeof priceRanges)[number]["id"]>("all");
  const [sort, setSort] = useState<SearchSortOption>("relevance");

  const productTypeCounts = useMemo(() => getProductTypeCounts(), []);
  const selectedPriceRange =
    priceRanges.find((range) => range.id === priceRangeId) ?? priceRanges[0];

  const products = useMemo(
    () =>
      searchProducts({
        query,
        inStockOnly,
        productType,
        minPrice: selectedPriceRange.minPrice,
        maxPrice: selectedPriceRange.maxPrice,
        sort,
      }),
    [inStockOnly, productType, query, selectedPriceRange, sort],
  );

  function submitSearch() {
    router.push(buildSearchHref(query));
  }

  return (
    <main className="bg-neutral-50">
      <section className="mx-auto w-[calc(100%-2rem)] max-w-[1600px] py-10 sm:w-[calc(100%-4rem)] lg:py-14">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-neutral-400">
            Kết quả tìm kiếm
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
            {products.length} kết quả
            {initialQuery ? ` cho "${initialQuery}"` : ""}
          </h1>

          <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 border-b border-neutral-300 pb-3">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitSearch();
                }
              }}
              placeholder="Nhập tên sản phẩm..."
              className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-2xl font-bold shadow-none placeholder:text-neutral-400 focus:border-transparent focus:ring-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Tìm kiếm"
              onClick={submitSearch}
            >
              <Search className="size-5" />
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr] xl:gap-12">
          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 lg:sticky lg:top-28">
            <div className="mb-6 flex items-center gap-3">
              <SlidersHorizontal className="size-5" />
              <h2 className="text-base font-bold text-neutral-950">Bộ lọc</h2>
            </div>

            <div className="space-y-7">
              <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-neutral-200 pb-6">
                <span className="text-sm font-bold text-neutral-900">Chỉ sản phẩm còn hàng</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(event) => setInStockOnly(event.target.checked)}
                  className="size-5 accent-neutral-950"
                />
              </label>

              <div className="border-b border-neutral-200 pb-6">
                <p className="mb-3 text-sm font-bold text-neutral-950">Loại sản phẩm</p>
                <div className="grid gap-2">
                  <FilterButton
                    active={productType === "all"}
                    label="Tất cả"
                    onClick={() => setProductType("all")}
                  />
                  {productTypeCounts.map((item) => (
                    <FilterButton
                      key={item.id}
                      active={productType === item.id}
                      label={`${item.label} (${item.count})`}
                      onClick={() => setProductType(item.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="border-b border-neutral-200 pb-6">
                <p className="mb-3 text-sm font-bold text-neutral-950">Khoảng giá</p>
                <div className="grid gap-2">
                  {priceRanges.map((range) => (
                    <FilterButton
                      key={range.id}
                      active={priceRangeId === range.id}
                      label={range.label}
                      onClick={() => setPriceRangeId(range.id)}
                    />
                  ))}
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full"
                onClick={() => {
                  setInStockOnly(false);
                  setProductType("all");
                  setPriceRangeId("all");
                  setSort("relevance");
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-neutral-500">
                Đang hiển thị <strong className="text-neutral-950">{products.length}</strong> sản phẩm
              </p>

              <label className="flex items-center gap-3 text-sm font-bold text-neutral-950">
                Sắp xếp
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SearchSortOption)}
                  className="h-10 rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium outline-none focus:border-neutral-950"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {products.length > 0 ? (
              <ProductList
                products={products}
                columns={3}
                isShowed={false}
                alignPagination="center"
                variantPagination="default"
                pagination={{
                  currentPage: 1,
                  pageSize: products.length,
                  totalItems: products.length,
                  totalPages: 1,
                  hasNext: false,
                  hasPrevious: false,
                }}
              />
            ) : (
              <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
                <p className="text-2xl font-bold text-neutral-950">
                  Không có sản phẩm phù hợp
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
                  Thử đổi từ khóa, bỏ bớt filter hoặc tìm theo tên board game bạn muốn tối ưu khay chứa.
                </p>
              </div>
            )}

            {products.length > 0 ? (
              <div className="mt-10 rounded-2xl bg-white p-5 text-sm text-neutral-500">
                Khoảng giá hiện tại:{" "}
                <strong className="text-neutral-950">
                  {selectedPriceRange.id === "all"
                    ? "Tất cả"
                    : `${formatCurrency(selectedPriceRange.minPrice, "VND")} - ${
                        Number.isFinite(selectedPriceRange.maxPrice)
                          ? formatCurrency(selectedPriceRange.maxPrice, "VND")
                          : "trở lên"
                      }`}
                </strong>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

type FilterButtonProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

function FilterButton({ active, label, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
        active
          ? "border-neutral-950 bg-neutral-950 text-white"
          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-950 hover:text-neutral-950",
      )}
    >
      {label}
    </button>
  );
}

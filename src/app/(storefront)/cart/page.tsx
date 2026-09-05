"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";

import StoreSectionHeading from "@/components/shared/store-section-heading";
import { CartItemRow } from "@/features/cart/components/cart-item-row";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { calculateCartTotals, mapCartToViewItems } from "@/features/cart/lib/cart-view-model";
import {
  clearMockCartAsync,
  getMockCartAsync,
  removeMockCartItemAsync,
  setMockCartItemSelectedAsync,
  updateMockCartQuantityAsync,
} from "@/features/cart/lib/mock-cart-store";
import type { CartViewItem } from "@/features/cart/types/cart";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartViewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const totals = useMemo(() => calculateCartTotals(cartItems), [cartItems]);

  const loadCartAsync = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const cart = await getMockCartAsync();
      setCartItems(mapCartToViewItems(cart));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Không thể tải giỏ hàng.");
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadCartAsync();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadCartAsync]);

  const updateQuantityAsync = async (id: string, action: "increment" | "decrement") => {
    const currentItem = cartItems.find((item) => item.id === id);

    if (!currentItem) return;

    const nextQuantity =
      action === "increment"
        ? Math.min(currentItem.quantity + 1, 10)
        : Math.max(currentItem.quantity - 1, 1);

    if (nextQuantity === currentItem.quantity) return;

    setPendingItemId(id);

    try {
      await updateMockCartQuantityAsync(id, nextQuantity);
      await loadCartAsync();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Không thể cập nhật số lượng.");
    } finally {
      setPendingItemId(null);
    }
  };

  const removeItemAsync = async (id: string) => {
    setPendingItemId(id);

    try {
      await removeMockCartItemAsync(id);
      await loadCartAsync();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Không thể xóa sản phẩm.");
    } finally {
      setPendingItemId(null);
    }
  };

  const toggleSelectedAsync = async (id: string, selected: boolean) => {
    setPendingItemId(id);

    try {
      await setMockCartItemSelectedAsync(id, selected);
      setCartItems((previousItems) =>
        previousItems.map((item) => (item.id === id ? { ...item, isSelected: selected } : item)),
      );
    } catch (selectedError) {
      setError(selectedError instanceof Error ? selectedError.message : "Không thể cập nhật trạng thái chọn.");
    } finally {
      setPendingItemId(null);
    }
  };

  const clearCartHandlerAsync = async () => {
    setIsClearing(true);

    try {
      await clearMockCartAsync();
      setCartItems([]);
    } catch (clearError) {
      setError(clearError instanceof Error ? clearError.message : "Không thể xóa toàn bộ giỏ hàng.");
    } finally {
      setIsClearing(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4 py-20">
        <div className="text-center">
          <div className="mx-auto size-9 animate-spin rounded-full border-2 border-slate-200 border-t-slate-950" />
          <h1 className="mt-4 text-lg font-bold text-slate-950">Đang tải giỏ hàng</h1>
          <p className="mt-1 text-sm text-slate-500">Vui lòng chờ trong giây lát...</p>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-slate-100 text-slate-700">
            <ShoppingBag className="size-7" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-slate-950">Giỏ hàng đang trống</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy tiếp tục khám phá cửa hàng.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red-700 px-6 text-sm font-bold text-white transition hover:bg-red-800"
          >
            <ArrowLeft className="size-4" />
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <header className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg py-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
          >
            <ArrowLeft className="size-4" />
            Quay lại cửa hàng
          </Link>

          <div className="mt-4 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <StoreSectionHeading
              title="Giỏ hàng của bạn"
              description={`${cartItems.length} sản phẩm trong giỏ hàng`}
              className="!block"
            />

            <button
              type="button"
              onClick={() => void clearCartHandlerAsync()}
              disabled={isClearing}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <Trash2 className="size-4" />
              {isClearing ? "Đang xóa..." : "Xóa toàn bộ"}
            </button>
          </div>
        </header>

        {error ? (
          <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <section className="min-w-0 lg:col-span-8">
            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  isPending={pendingItemId === item.id}
                  onQuantityChange={(productId, action) => void updateQuantityAsync(productId, action)}
                  onRemove={(productId) => void removeItemAsync(productId)}
                  onSelectedChange={(productId, selected) => void toggleSelectedAsync(productId, selected)}
                />
              ))}
            </div>
          </section>

          <aside className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 className="mb-3 text-lg font-bold text-slate-950">Tóm tắt đơn hàng</h2>
              <CartSummary totals={totals} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

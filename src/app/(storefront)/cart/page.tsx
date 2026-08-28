"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

import {
  clearCartAsync,
  getCartAsync,
  removeItemFromCartAsync,
  setCartItemSelectedAsync,
  updateQuantityCartAsync,
} from "@/features/cart/services/cart-api";
import { getProductByIdAsync } from "@/features/products/services/products-api";
import type { ProductDetailDto } from "@/features/products/types/product-details";
import StoreSectionHeading from "@/components/shared/store-section-heading";

type CartViewItem = {
  id: string;
  name: string;
  series: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  isSelected: boolean;
};

function getDisplayPrice(product: ProductDetailDto): number {
  const discountPercentage = product.discountPercentage ?? 0;
  const discountedPrice = product.orginalPrice * (1 - discountPercentage / 100);

  return Number(discountedPrice.toFixed(2));
}

function getDisplaySeries(product: ProductDetailDto, productId: string): string {
  if (product.materials.length > 0) {
    return product.materials.map((material) => material.matterialName).join(" | ");
  }

  return `Mã sản phẩm | ${productId}`;
}

function getPrimaryImage(product: ProductDetailDto): string | null {
  return (
    product.images.find((image) => image.isPrimary)?.publicUrl ??
    product.images[0]?.publicUrl ??
    null
  );
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartViewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const loadCartAsync = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const cart = await getCartAsync();

      const detailedItems = await Promise.all(
        cart.productCarts.map(async (cartItem) => {
          try {
            const product = await getProductByIdAsync(cartItem.productid);

            return {
              id: cartItem.productid,
              name: product.name,
              series: getDisplaySeries(product, cartItem.productid),
              price: getDisplayPrice(product),
              quantity: cartItem.quantity,
              imageUrl: getPrimaryImage(product),
              isSelected: cartItem.isSelected,
            } satisfies CartViewItem;
          } catch {
            return {
              id: cartItem.productid,
              name: `Sản phẩm ${cartItem.productid.slice(0, 8)}`,
              series: `Mã sản phẩm | ${cartItem.productid}`,
              price: 0,
              quantity: cartItem.quantity,
              imageUrl: null,
              isSelected: cartItem.isSelected,
            } satisfies CartViewItem;
          }
        })
      );

      setCartItems(detailedItems);
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : "Không thể tải giỏ hàng.";

      setError(message);
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

  const updateQuantityAsync = async (
    id: string,
    action: "increment" | "decrement"
  ) => {
    const currentItem = cartItems.find((item) => item.id === id);

    if (!currentItem) {
      return;
    }

    const nextQuantity =
      action === "increment"
        ? Math.min(currentItem.quantity + 1, 10)
        : Math.max(currentItem.quantity - 1, 1);

    if (nextQuantity === currentItem.quantity) {
      return;
    }

    setPendingItemId(id);

    try {
      await updateQuantityCartAsync(id, nextQuantity);
      await loadCartAsync();
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Không thể cập nhật số lượng trong giỏ hàng."
      );
    } finally {
      setPendingItemId(null);
    }
  };

  const removeItemAsync = async (id: string) => {
    setPendingItemId(id);

    try {
      await removeItemFromCartAsync(id);
      await loadCartAsync();
    } catch (removeError) {
      setError(
        removeError instanceof Error
          ? removeError.message
          : "Không thể xóa sản phẩm khỏi giỏ hàng."
      );
    } finally {
      setPendingItemId(null);
    }
  };

  const toggleSelectedAsync = async (id: string, selected: boolean) => {
    setPendingItemId(id);

    try {
      await setCartItemSelectedAsync(id, selected);

      setCartItems((previousItems) =>
        previousItems.map((item) =>
          item.id === id ? { ...item, isSelected: selected } : item
        )
      );
    } catch (selectedError) {
      setError(
        selectedError instanceof Error
          ? selectedError.message
          : "Không thể cập nhật trạng thái chọn của sản phẩm trong giỏ hàng."
      );
    } finally {
      setPendingItemId(null);
    }
  };

  const clearCartHandlerAsync = async () => {
    setIsClearing(true);

    try {
      await clearCartAsync();
      setCartItems([]);
    } catch (clearError) {
      setError(
        clearError instanceof Error
          ? clearError.message
          : "Không thể xóa toàn bộ sản phẩm khỏi giỏ hàng."
      );
    } finally {
      setIsClearing(false);
    }
  };

  const selectedItems = useMemo(
    () => cartItems.filter((item) => item.isSelected),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      selectedItems.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      ),
    [selectedItems]
  );

  const shipping = selectedItems.length === 0 ? 0 : subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] w-full items-center justify-center bg-slate-50 px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600" />

          <h1 className="type-h5 mt-5 text-slate-950">
            Đang tải giỏ hàng
          </h1>

          <p className="mt-1 text-sm text-slate-500">Vui lòng chờ trong giây lát...</p>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] w-full items-center justify-center bg-slate-50 px-4 py-16 sm:px-6">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <ShoppingBag className="h-9 w-9" />
          </div>

          <h1 className="type-h2 mt-6 text-slate-950">
            Giỏ hàng đang trống
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
            Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy tiếp tục khám phá và chọn sản phẩm phù hợp với bạn.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Tiếp tục mua sắm
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <header className="mb-6 sm:mb-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg py-1 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Quay lại cửa hàng
          </Link>

          <div className="mt-4 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <ShoppingBag className="h-5 w-5" />
                </div>

                <div>
                  <StoreSectionHeading
                    title="Giỏ hàng của bạn"
                    description={`${cartItems.length} sản phẩm trong giỏ hàng`}
                    className="!block"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void clearCartHandlerAsync()}
              disabled={isClearing}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <Trash2 className="h-4 w-4" />
              {isClearing ? "Đang xóa..." : "Xóa toàn bộ"}
            </button>
          </div>
        </header>

        {error ? (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm leading-6 text-red-700"
          >
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-500" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <section className="min-w-0 lg:col-span-8">
            <StoreSectionHeading
              title="Sản phẩm trong giỏ"
              description="Chọn sản phẩm bạn muốn thanh toán"
              className="mb-4 !block"
            />

            <div className="space-y-4">
              {cartItems.map((item) => {
                const isPending = pendingItemId === item.id;

                return (
                  <article
                    key={item.id}
                    className={[
                      "relative overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-200",
                      item.isSelected
                        ? "border-slate-200 hover:border-slate-300 hover:shadow-md"
                        : "border-slate-200 bg-slate-50/70 opacity-75",
                    ].join(" ")}
                  >
                    <div className="flex gap-3 p-4 sm:gap-5 sm:p-5">
                      <div className="flex shrink-0 items-start pt-1 sm:pt-2">
                        <label
                          className="flex cursor-pointer items-center"
                          title={item.isSelected ? "Bỏ chọn sản phẩm" : "Chọn sản phẩm"}
                        >
                          <input
                            type="checkbox"
                            checked={item.isSelected}
                            disabled={isPending}
                            onChange={(event) =>
                              void toggleSelectedAsync(item.id, event.target.checked)
                            }
                            className="h-5 w-5 cursor-pointer rounded-md border-slate-300 text-blue-600 accent-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </label>
                      </div>

                      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:w-32">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={224}
                            height={288}
                            unoptimized
                            className="h-full w-full object-contain object-center transition-transform duration-300 hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
                            <ShoppingBag className="h-6 w-6 text-slate-300" />

                            <span className="mt-2 text-[11px] font-medium text-slate-400">
                              Chưa có ảnh
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                          <div className="min-w-0">
                            <h3 className="type-h6 line-clamp-2 text-slate-950">
                              {item.name}
                            </h3>

                            <p className="mt-1.5 line-clamp-2 break-words text-xs leading-5 text-slate-500 sm:text-sm">
                              {item.series}
                            </p>

                            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                              <span>Đơn giá:</span>

                              <span className="font-semibold text-slate-700">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0 sm:text-right">
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                              Thành tiền
                            </p>

                            <p className="type-h6 mt-1 text-slate-950">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                              Số lượng
                            </p>

                            <div className="inline-flex h-10 items-center rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-inner">
                              <button
                                type="button"
                                aria-label="Giảm số lượng"
                                title="Giảm số lượng"
                                disabled={isPending}
                                onClick={() => void updateQuantityAsync(item.id, "decrement")}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition duration-150 hover:bg-white hover:text-slate-950 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <Minus className="h-4 w-4" />
                              </button>

                              <span className="min-w-10 px-2 text-center text-sm font-bold tabular-nums text-slate-950">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                aria-label="Tăng số lượng"
                                title="Tăng số lượng"
                                disabled={isPending}
                                onClick={() => void updateQuantityAsync(item.id, "increment")}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition duration-150 hover:bg-white hover:text-slate-950 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => void removeItemAsync(item.id)}
                            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl px-3 text-sm font-medium text-slate-500 transition duration-150 hover:bg-red-50 hover:text-red-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
                          >
                            <Trash2 className="h-4 w-4" />
                            Xóa sản phẩm
                          </button>
                        </div>

                        {isPending ? (
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
                            <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="min-w-0 lg:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                  <h2 className="type-h5 text-slate-950">
                    Tóm tắt đơn hàng
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Kiểm tra thông tin trước khi thanh toán
                  </p>
                </div>

                <div className="px-5 py-5 sm:px-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">Sản phẩm đã chọn</span>

                      <span className="font-semibold tabular-nums text-slate-950">
                        {selectedItems.length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">Tạm tính</span>

                      <span className="font-semibold tabular-nums text-slate-950">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-500">Phí vận chuyển</span>

                      <span
                        className={[
                          "font-semibold tabular-nums",
                          shipping === 0 ? "text-emerald-600" : "text-slate-950",
                        ].join(" ")}
                      >
                        {shipping === 0 ? "Miễn phí" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  {shipping > 0 ? (
                    <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-3 text-xs leading-5 text-blue-800">
                      Mua thêm <strong className="font-bold">${(150 - subtotal).toFixed(2)}</strong> để được miễn phí vận chuyển toàn quốc.
                    </div>
                  ) : null}

                  <div className="my-5 border-t border-dashed border-slate-200" />

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Tổng thanh toán</p>

                      <p className="mt-1 text-xs text-slate-400">Đã bao gồm phí vận chuyển</p>
                    </div>

                    <span className="type-h4 tabular-nums text-blue-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={selectedItems.length === 0}
                    className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  >
                    Tiến hành thanh toán
                  </button>

                  {selectedItems.length === 0 ? (
                    <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                      Vui lòng chọn ít nhất một sản phẩm để thanh toán.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">Thanh toán an toàn</h3>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Hệ thống thanh toán được bảo mật. Sản phẩm được đóng gói chống sốc để bảo vệ hộp gốc trong quá trình vận chuyển.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

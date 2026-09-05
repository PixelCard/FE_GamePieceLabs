"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { FREE_SHIPPING_THRESHOLD } from "@/features/cart/lib/cart-view-model";
import type { CartTotals } from "@/features/cart/types/cart";
import { formatCurrency } from "@/utils/format-currency";
import { cn } from "@/utils/cn";

type CartSummaryProps = {
  totals: CartTotals;
  compact?: boolean;
  showViewCartLink?: boolean;
  itemCountLabel?: string;
};

export function CartSummary({
  totals,
  compact = false,
  showViewCartLink = false,
  itemCountLabel = "Sản phẩm đã chọn",
}: CartSummaryProps) {
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totals.subtotal, 0);

  return (
      <div className={cn("border border-slate-200 bg-white", compact ? "rounded-2xl p-4" : "rounded-2xl p-5 shadow-sm sm:p-6")}>
      <div className="mb-3 flex items-center justify-between gap-4 text-sm">
        <span className="text-slate-500">{itemCountLabel}</span>
        <span className="font-bold tabular-nums text-slate-950">
          {totals.selectedItems.reduce((accumulator, item) => accumulator + item.quantity, 0)}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-500">Phí vận chuyển</span>
          <span className={cn("font-bold tabular-nums", totals.shipping === 0 ? "text-emerald-600" : "text-slate-950")}>
            {totals.shipping === 0 ? "Miễn phí" : formatCurrency(totals.shipping, "VND")}
          </span>
        </div>
      </div>

      {totals.shipping > 0 ? (
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-xs leading-5 text-emerald-800">
          Mua thêm <strong>{formatCurrency(remainingForFreeShipping, "VND")}</strong> để được miễn phí vận chuyển.
        </div>
      ) : null}

      <div className="my-4 border-t border-dashed border-slate-200" />

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-900">Tổng ước tính</p>
          <p className="mt-1 text-xs text-slate-400">Thuế và ưu đãi tính ở checkout</p>
        </div>
        <span className={cn("font-bold tabular-nums text-slate-950", compact ? "text-lg" : "text-2xl")}>
          {formatCurrency(totals.total, "VND")}
        </span>
      </div>

      <div className={cn("mt-5 grid gap-3", showViewCartLink && "grid-cols-2")}>
        {showViewCartLink ? (
          <Link
            href="/cart"
            className="inline-flex h-11 items-center justify-center rounded-full border border-red-600 bg-white px-4 text-sm font-bold text-red-700 transition hover:bg-red-50"
          >
            Xem giỏ
          </Link>
        ) : null}
        <button
          type="button"
          disabled={totals.selectedItems.length === 0}
          className="inline-flex h-11 items-center justify-center rounded-full bg-red-700 px-5 text-sm font-bold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          Thanh toán
        </button>
      </div>

      {!compact ? (
        <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-3 text-xs leading-5 text-slate-600">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
          Thanh toán được bảo mật. Hàng sẽ được đóng gói chống sốc trước khi vận chuyển.
        </div>
      ) : null}
    </div>
  );
}

"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import type { CartViewItem } from "@/features/cart/types/cart";
import { formatCurrency } from "@/utils/format-currency";
import { cn } from "@/utils/cn";

type CartItemRowProps = {
  item: CartViewItem;
  isPending?: boolean;
  compact?: boolean;
  respectSelectionState?: boolean;
  showRemoveButton?: boolean;
  onQuantityChange: (id: string, action: "increment" | "decrement") => void;
  onRemove: (id: string) => void;
  onSelectedChange?: (id: string, selected: boolean) => void;
};

export function CartItemRow({
  item,
  isPending = false,
  compact = false,
  respectSelectionState = true,
  showRemoveButton = true,
  onQuantityChange,
  onRemove,
  onSelectedChange,
}: CartItemRowProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden border bg-white transition duration-200",
        compact ? "rounded-xl border-slate-200 p-3" : "rounded-2xl border-slate-200 p-4 shadow-sm sm:p-5",
        respectSelectionState && !item.isSelected && "bg-slate-50/70 opacity-75",
      )}
    >
      <div className={cn("flex gap-3", compact ? "items-start" : "sm:gap-5")}>
        {onSelectedChange ? (
          <label className="mt-1 flex shrink-0 cursor-pointer items-center" title="Chọn sản phẩm">
            <input
              type="checkbox"
              checked={item.isSelected}
              disabled={isPending}
              onChange={(event) => onSelectedChange(item.id, event.target.checked)}
              className="size-4 cursor-pointer rounded border-slate-300 accent-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </label>
        ) : null}

        <div
          className={cn(
            "relative shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50",
            compact ? "size-20 p-2" : "size-24 p-3 sm:size-28",
          )}
        >
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              unoptimized
              sizes={compact ? "80px" : "128px"}
              className="object-contain p-2"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag className="size-6 text-slate-300" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className={cn("flex gap-3", compact ? "flex-col" : "flex-col sm:flex-row sm:justify-between")}>
            <div className="min-w-0">
              <h3 className={cn("line-clamp-2 font-bold leading-tight text-slate-950", compact ? "text-sm" : "text-base sm:text-lg")}>
                {item.name}
              </h3>
              <p className={cn("mt-1 line-clamp-2 text-slate-500", compact ? "text-xs leading-4" : "text-xs leading-5")}>
                {item.series}
              </p>
            </div>

            <div className={cn("shrink-0", compact ? "" : "sm:text-right")}>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Thành tiền
              </p>
              <p className={cn("mt-0.5 font-bold tabular-nums text-slate-950", compact ? "text-sm" : "text-base")}>
                {formatCurrency(item.price * item.quantity, "VND")}
              </p>
            </div>
          </div>

          <div className={cn("mt-4 flex gap-3", compact ? "items-center justify-between" : "flex-col sm:flex-row sm:items-center sm:justify-between")}>
            <div className="inline-flex h-9 items-center rounded-full border border-slate-200 bg-slate-50 px-1">
              <button
                type="button"
                aria-label="Giảm số lượng"
                disabled={isPending}
                onClick={() => onQuantityChange(item.id, "decrement")}
                className="grid size-7 place-items-center rounded-full text-slate-500 hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="min-w-8 text-center text-sm font-bold tabular-nums">{item.quantity}</span>
              <button
                type="button"
                aria-label="Tăng số lượng"
                disabled={isPending}
                onClick={() => onQuantityChange(item.id, "increment")}
                className="grid size-7 place-items-center rounded-full text-slate-500 hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="size-3.5" />
              </button>
            </div>

            <button
              type="button"
              disabled={isPending}
              onClick={() => onRemove(item.id)}
              className={cn(
                "inline-flex h-9 items-center justify-center gap-2 rounded-full px-3 text-xs font-bold text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40",
                !showRemoveButton && "hidden",
              )}
            >
              <Trash2 className="size-3.5" />
              Xóa
            </button>
          </div>
        </div>
      </div>

      {isPending ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
          <div className="size-6 animate-spin rounded-full border-2 border-slate-200 border-t-slate-950" />
        </div>
      ) : null}
    </article>
  );
}

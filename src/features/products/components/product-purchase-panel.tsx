"use client";

import { useState } from "react";
import { Check, CreditCard, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ProductPurchasePanel() {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  return (
    <>
      <div className="mt-7">
        <span className="text-xs font-semibold text-neutral-500">Số lượng</span>
        <div className="mt-2 flex h-11 w-32 items-center justify-between rounded-full border border-neutral-300 px-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Giảm số lượng"
            disabled={quantity === 1}
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            className="rounded-full"
          >
            <Minus />
          </Button>
          <output
            className="min-w-6 text-center text-sm font-semibold"
            aria-live="polite"
          >
            {quantity}
          </output>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Tăng số lượng"
            onClick={() => setQuantity((current) => current + 1)}
            className="rounded-full"
          >
            <Plus />
          </Button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-700">
        <span className="flex size-5 items-center justify-center rounded-full bg-emerald-600 text-white">
          <Check className="size-3" strokeWidth={3} />
        </span>
        Còn hàng — sẵn sàng giao
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button
          type="button"
          size="lg"
          onClick={() => setIsAdded(true)}
          className="rounded-full bg-red-700 text-white shadow-none hover:bg-red-800"
        >
          {isAdded ? (
            <>
              <Check /> Đã thêm {quantity} sản phẩm
            </>
          ) : (
            <>Thêm vào giỏ hàng</>
          )}
        </Button>
        <Button
          type="button"
          size="lg"
          className="rounded-full bg-violet-600 text-white shadow-none hover:bg-violet-700"
        >
          Mua ngay
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 sm:justify-end">
        <span className="inline-flex items-center gap-1.5">
          <CreditCard className="size-4" /> Thanh toán an toàn
        </span>
        <button
          type="button"
          className="underline underline-offset-4 hover:text-neutral-950"
        >
          Xem thêm phương thức thanh toán
        </button>
      </div>
    </>
  );
}

"use client";

import { useCallback, useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartItemRow } from "@/features/cart/components/cart-item-row";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { calculateCartTotals, mapCartToViewItems } from "@/features/cart/lib/cart-view-model";
import {
  getMockCartAsync,
  removeMockCartItemAsync,
  updateMockCartQuantityAsync,
} from "@/features/cart/lib/mock-cart-store";
import type { CartViewItem } from "@/features/cart/types/cart";
import { cn } from "@/utils/cn";

type CartDrawerProps = {
  iconSizeClassName?: string;
  badgeSizeClassName?: string;
};

export function CartDrawer({
  iconSizeClassName = "size-6",
  badgeSizeClassName = "size-5 text-[10px]",
}: CartDrawerProps) {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartViewItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);

  const totals = useMemo(
    () => calculateCartTotals(cartItems, { includeUnselected: true }),
    [cartItems],
  );

  const loadCartAsync = useCallback(async () => {
    setIsLoading(true);

    try {
      const cart = await getMockCartAsync();
      setCartItems(mapCartToViewItems(cart));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      void loadCartAsync();
    }
  };

  const updateQuantityAsync = async (id: string, action: "increment" | "decrement") => {
    const currentItem = cartItems.find((item) => item.id === id);

    if (!currentItem) return;

    if (action === "decrement" && currentItem.quantity === 1) {
      await removeItemAsync(id);
      return;
    }

    const nextQuantity =
      action === "increment"
        ? Math.min(currentItem.quantity + 1, 10)
        : currentItem.quantity - 1;

    if (nextQuantity === currentItem.quantity) return;

    setPendingItemId(id);

    try {
      await updateMockCartQuantityAsync(id, nextQuantity);
      await loadCartAsync();
    } finally {
      setPendingItemId(null);
    }
  };

  const removeItemAsync = async (id: string) => {
    setPendingItemId(id);

    try {
      await removeMockCartItemAsync(id);
      await loadCartAsync();
    } finally {
      setPendingItemId(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label={`Giỏ hàng, ${cartItems.length || 1} sản phẩm`}>
          <ShoppingBag className={iconSizeClassName} />
          <Badge
            className={cn(
              "absolute -right-0.5 -top-0.5 border-0 bg-foreground p-0 font-bold text-background",
              badgeSizeClassName,
            )}
          >
            {cartItems.length || 1}
          </Badge>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[92vw] gap-0 overflow-hidden p-0 sm:max-w-[470px]">
        <SheetHeader className="border-b border-slate-200 px-5 py-5 text-left">
          <SheetTitle className="text-xl font-bold text-slate-950">
            Giỏ hàng của bạn ({cartItems.length})
          </SheetTitle>
          <SheetDescription>
            Xem nhanh sản phẩm trước khi vào trang giỏ hàng đầy đủ.
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="border-b border-emerald-100 bg-emerald-50 px-5 py-3 text-center text-xs font-semibold leading-5 text-emerald-800">
            Mua thêm sản phẩm để nhận ưu đãi và miễn phí vận chuyển.
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
            {isLoading ? (
              <div className="flex min-h-48 items-center justify-center">
                <div className="size-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-950" />
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex min-h-48 flex-col items-center justify-center text-center">
                <ShoppingBag className="size-10 text-slate-300" />
                <p className="mt-3 text-sm font-bold text-slate-950">Giỏ hàng đang trống</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Khi bạn thêm sản phẩm, danh sách sẽ hiển thị tại đây.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    compact
                    respectSelectionState={false}
                    showRemoveButton={false}
                    isPending={pendingItemId === item.id}
                    onQuantityChange={(productId, action) => void updateQuantityAsync(productId, action)}
                    onRemove={(productId) => void removeItemAsync(productId)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-white p-5 shadow-[0_-18px_40px_rgba(15,23,42,0.08)]">
            <CartSummary
              totals={totals}
              compact
              showViewCartLink
              itemCountLabel="Sản phẩm trong giỏ"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

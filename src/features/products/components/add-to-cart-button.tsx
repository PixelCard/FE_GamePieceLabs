"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

import { addItemToCartAsync } from "@/features/cart/services/cart-api";

type AddToCartButtonProps = {
  productId: string;
};

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleAddToCartAsync = async () => {
    setIsSubmitting(true);
    setMessage(null);
    setIsError(false);

    try {
      await addItemToCartAsync(productId, 1);
      setMessage("Đã thêm sản phẩm vào giỏ hàng.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Không thể thêm vào giỏ hàng.";
      setIsError(true);
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-w-[140px] flex-1">
      <button
        type="button"
        onClick={() => void handleAddToCartAsync()}
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-2 py-3 text-base font-bold text-white shadow-sm transition-all hover:bg-orange-700 active:scale-98 disabled:cursor-not-allowed disabled:opacity-60 md:px-8"
      >
        <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
        <span className="whitespace-nowrap">
          {isSubmitting ? "Đang thêm..." : "Thêm vào giỏ hàng"}
        </span>
      </button>

      {message ? (
        <p className={`mt-2 text-xs md:text-sm ${isError ? "text-red-600" : "text-emerald-600"}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}

import { getMockProductById } from "@/features/products/lib/mock-product-details";
import type { ProductDetailDto } from "@/features/products/types/product-details";
import type { CartDto, CartTotals, CartViewItem } from "@/features/cart/types/cart";

export const FREE_SHIPPING_THRESHOLD = 3_000_000;
export const STANDARD_SHIPPING_FEE = 30_000;

function getDisplayPrice(product: ProductDetailDto): number {
  const discountPercentage = product.discountPercentage ?? 0;
  const discountedPrice = product.orginalPrice * (1 - discountPercentage / 100);

  return Math.round(discountedPrice);
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

export function mapCartToViewItems(cart: CartDto): CartViewItem[] {
  return cart.productCarts.map((cartItem) => {
    const product = getMockProductById(cartItem.productid);

    if (!product) {
      return {
        id: cartItem.productid,
        name: `Sản phẩm ${cartItem.productid.slice(0, 8)}`,
        series: `Mã sản phẩm | ${cartItem.productid}`,
        price: 0,
        quantity: cartItem.quantity,
        imageUrl: null,
        isSelected: cartItem.isSelected,
      };
    }

    return {
      id: cartItem.productid,
      name: product.name,
      series: getDisplaySeries(product, cartItem.productid),
      price: getDisplayPrice(product),
      quantity: cartItem.quantity,
      imageUrl: getPrimaryImage(product),
      isSelected: cartItem.isSelected,
    };
  });
}

type CalculateCartTotalsOptions = {
  includeUnselected?: boolean;
};

export function calculateCartTotals(
  cartItems: CartViewItem[],
  options: CalculateCartTotalsOptions = {},
): CartTotals {
  const billableItems = options.includeUnselected
    ? cartItems
    : cartItems.filter((item) => item.isSelected);
  const subtotal = billableItems.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0,
  );
  const shipping =
    billableItems.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING_FEE;

  return {
    selectedItems: billableItems,
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}

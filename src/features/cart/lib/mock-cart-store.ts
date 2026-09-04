import { mockCart } from "@/features/cart/data/mock-cart";
import type { CartDto } from "@/features/cart/types/cart";

const MOCK_DELAY_MS = 250;

const cartState = structuredClone(mockCart);

function waitForMockResponse(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, MOCK_DELAY_MS);
  });
}

function touchCart(): void {
  const now = new Date().toISOString();
  cartState.updateCartAt = now;
  cartState.lastActivityAt = now;
}

export async function getMockCartAsync(): Promise<CartDto> {
  await waitForMockResponse();
  return structuredClone(cartState);
}

export async function addMockItemToCartAsync(
  productid: string,
  quantity: number,
): Promise<CartDto> {
  await waitForMockResponse();

  const existingItem = cartState.productCarts.find((item) => item.productid === productid);
  const now = new Date().toISOString();

  if (existingItem) {
    existingItem.quantity = Math.min(existingItem.quantity + quantity, 10);
    existingItem.updatedat = now;
  } else {
    cartState.productCarts.push({
      productid,
      quantity: Math.min(Math.max(quantity, 1), 10),
      isSelected: true,
      addedat: now,
      updatedat: now,
    });
  }

  touchCart();
  return structuredClone(cartState);
}

export async function updateMockCartQuantityAsync(
  productid: string,
  quantity: number,
): Promise<CartDto> {
  await waitForMockResponse();

  const item = cartState.productCarts.find((cartItem) => cartItem.productid === productid);
  if (item) {
    item.quantity = Math.min(Math.max(quantity, 1), 10);
    item.updatedat = new Date().toISOString();
    touchCart();
  }

  return structuredClone(cartState);
}

export async function removeMockCartItemAsync(productid: string): Promise<CartDto> {
  await waitForMockResponse();
  cartState.productCarts = cartState.productCarts.filter((item) => item.productid !== productid);
  touchCart();
  return structuredClone(cartState);
}

export async function setMockCartItemSelectedAsync(
  productid: string,
  selected: boolean,
): Promise<CartDto> {
  await waitForMockResponse();

  const item = cartState.productCarts.find((cartItem) => cartItem.productid === productid);
  if (item) {
    item.isSelected = selected;
    item.updatedat = new Date().toISOString();
    touchCart();
  }

  return structuredClone(cartState);
}

export async function clearMockCartAsync(): Promise<void> {
  await waitForMockResponse();
  cartState.productCarts = [];
  touchCart();
}

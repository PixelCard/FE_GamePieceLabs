import { NextRequest } from "next/server";

import { proxyCartRequestAsync } from "@/features/cart/server/cart-backend";

type RouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  const { productId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as { quantity?: number };
  const quantity = Number(body.quantity ?? 1);
  const query = new URLSearchParams({
    quantity: String(quantity),
  });

  return proxyCartRequestAsync(request, `/item/${productId}?${query.toString()}`, {
    method: "POST",
  });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { productId } = await context.params;

  return proxyCartRequestAsync(request, `/item/${productId}`, {
    method: "DELETE",
  });
}

import { NextRequest } from "next/server";

import { proxyCartRequestAsync } from "@/features/cart/server/cart-backend";

type RouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  const { productId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as { quantity?: number };
  const quantity = Number(body.quantity ?? 1);
  const query = new URLSearchParams({
    quantity: String(quantity),
  });

  return proxyCartRequestAsync(request, `/item-quantity/${productId}?${query.toString()}`, {
    method: "PUT",
  });
}

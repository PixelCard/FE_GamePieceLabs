import { NextRequest } from "next/server";

import { proxyCartRequestAsync } from "@/features/cart/server/cart-backend";

type RouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  const { productId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as { selected?: boolean };
  const selected = body.selected === undefined ? true : Boolean(body.selected);
  const query = new URLSearchParams({
    selected: String(selected),
  });

  return proxyCartRequestAsync(request, `/set-item-selected/${productId}?${query.toString()}`, {
    method: "POST",
  });
}

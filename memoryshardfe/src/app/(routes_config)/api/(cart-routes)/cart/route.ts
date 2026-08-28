import { NextRequest } from "next/server";

import { proxyCartRequestAsync } from "@/features/cart/server/cart-backend";

export async function GET(request: NextRequest) {
  return proxyCartRequestAsync(request, "/cart", {
    method: "GET",
  });
}

export async function DELETE(request: NextRequest) {
  return proxyCartRequestAsync(request, "/clear-cart", {
    method: "POST",
  });
}

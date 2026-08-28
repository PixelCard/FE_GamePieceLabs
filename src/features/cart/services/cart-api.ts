import { CartDto } from "@/features/cart/types/cart";

const CART_API_BASE_URL = "/api/cart";

type ApiErrorShape = {
  error?: {
    message?: string;
  };
  message?: string;
};

async function parseCartErrorAsync(response: Response, fallbackMessage: string): Promise<string> {
  const rawText = await response.text();
  const trimmedText = rawText.trim();

  if (!trimmedText) {
    return fallbackMessage;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const parsed = JSON.parse(trimmedText) as ApiErrorShape;
      const message = parsed.error?.message ?? parsed.message;
      if (message) {
        return message;
      }
    } catch {
      return fallbackMessage;
    }
  }

  if (trimmedText.startsWith("<!DOCTYPE html") || trimmedText.startsWith("<html")) {
    switch (response.status) {
      case 401:
        return "Bạn cần đăng nhập để sử dụng tính năng";
      case 404:
        return "Không tìm thấy dữ liệu cần xử lý.";
      case 500:
        return "Server giỏ hàng đang lỗi. Vui lòng thử lại.";
      default:
        return fallbackMessage;
    }
  }

  switch (response.status) {
    case 400:
      return "Dữ liệu gửi lên chưa hợp lệ.";
    case 401:
      return "Bạn cần đăng nhập để thực hiện thao tác này.";
    case 403:
      return "Bạn không có quyền thực hiện thao tác này.";
    case 404:
      return "Không tìm thấy dữ liệu cần xử lý.";
    case 500:
      return "Server đang gặp lỗi. Vui lòng thử lại.";
    default:
      return fallbackMessage;
  }
}

export async function getCartAsync(): Promise<CartDto> {
  const response = await fetch(CART_API_BASE_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(await parseCartErrorAsync(response, "Không thể tải giỏ hàng."));
  }
  return response.json() as Promise<CartDto>;
}

export async function addItemToCartAsync(productid: string, quantity: number): Promise<CartDto> {
  const response = await fetch(`${CART_API_BASE_URL}/items/${productid}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) {
    throw new Error(await parseCartErrorAsync(response, "Không thể thêm vào giỏ hàng."));
  }
  return response.json() as Promise<CartDto>;
}

export async function updateQuantityCartAsync(productid: string, quantity: number): Promise<CartDto> {
  const response = await fetch(`${CART_API_BASE_URL}/items/${productid}/quantity`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) {
    throw new Error(await parseCartErrorAsync(response, "Không thể cập nhật số lượng sản phẩm."));
  }
  return response.json() as Promise<CartDto>;
}

export async function removeItemFromCartAsync(productid: string): Promise<CartDto> {
  const response = await fetch(`${CART_API_BASE_URL}/items/${productid}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(await parseCartErrorAsync(response, "Không thể xóa sản phẩm khỏi giỏ hàng."));
  }
  return response.json() as Promise<CartDto>;
}

export async function setCartItemSelectedAsync(productid: string, selected: boolean): Promise<CartDto> {
  const response = await fetch(`${CART_API_BASE_URL}/items/${productid}/selected`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selected }),
  });
  if (!response.ok) {
    throw new Error(await parseCartErrorAsync(response, "Không thể cập nhật trạng thái sản phẩm."));
  }
  return response.json() as Promise<CartDto>;
}

export async function clearCartAsync(): Promise<void> {
  const response = await fetch(CART_API_BASE_URL, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(await parseCartErrorAsync(response, "Không thể xóa giỏ hàng."));
  }
}

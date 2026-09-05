export type ProductCart = {
  productid: string;
  quantity: number;
  isSelected: boolean;
  addedat: string;
  updatedat: string;
};

export type CartDto = {
  userid: string;
  productCarts: ProductCart[];
  updateCartAt: string;
  lastActivityAt: string;
};

export type CartViewItem = {
  id: string;
  name: string;
  series: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  isSelected: boolean;
};

export type CartTotals = {
  selectedItems: CartViewItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

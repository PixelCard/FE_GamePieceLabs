export type HomeProductDto = {
  id: string;
  productname: string;
  providerName: string;
  orginalPrice: number;
  discountPercentage?: number | null;
  totalPrice: number;
  coverImageUrl?: string | null;
};

import {
  ProductCard,
  type ProductCardProps,
} from "@/components/shared/product-card";
import { cn } from "@/utils/cn";

export type ProductListColumnCount = 1 | 2 | 3 | 4 | 5;

interface ProductListProps {
  products: readonly ProductCardProps[];
  columns?: ProductListColumnCount;
  className?: string;
}

const columnClassNames: Record<ProductListColumnCount, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

const productImageSizes: Record<ProductListColumnCount, string> = {
  1: "(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 50vw, 100vw",
  2: "(max-width: 639px) calc(100vw - 32px), 50vw",
  3: "(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 50vw, 33vw",
  4: "(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 50vw, 25vw",
  5: "(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 50vw, 20vw",
};

export function ProductList({
  products,
  columns = 3,
  className,
}: ProductListProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:gap-x-6 lg:gap-y-14",
        columnClassNames[columns],
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={`${product.slug}-${product.gui}`}
          {...product}
          sizes={productImageSizes[columns]}
        />
      ))}
    </div>
  );
}

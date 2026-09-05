import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import {
  formatCurrency,
  type SupportedCurrency,
} from "@/utils/format-currency";

export type ProductCardProps = {
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: number;
  rating: number;
  currency: SupportedCurrency;
  quickAddLabel?: string;
  sizes?: string;
  className?: string;
  slug: string;
  gui: string;
};

export function ProductCard({
  name,
  imageSrc,
  imageAlt,
  price,
  rating,
  currency,
  quickAddLabel = "+ Quick add",
  sizes = "(max-width: 639px) 88vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw",
  className,
  slug,
  gui,
}: ProductCardProps) {
  const productHref = `/products/${slug}-${gui}`;
  const formattedPrice = formatCurrency(price, currency);

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden rounded-xl border-0 bg-white p-0 shadow-none",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-950">
        <Link href={productHref} aria-label={`Xem chi tiết ${name}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        <Button
          asChild
          aria-label={`${quickAddLabel}: ${name}`}
          className="absolute bottom-4 right-4 z-10 h-11 translate-y-0 rounded-full bg-neutral-950 px-6 text-sm font-bold text-white opacity-100 shadow-lg transition-all duration-300 hover:bg-neutral-800 focus-visible:opacity-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100"
        >
          <Link href={productHref}>{quickAddLabel}</Link>
        </Button>
      </div>

      <CardContent className="flex min-h-[132px] flex-col gap-2 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="m-0 line-clamp-2 text-base leading-[1.45] text-neutral-950">
            <Link href={productHref} className="transition-colors hover:text-blue-700">
              {name}
            </Link>
          </h3>

          <span
            className="inline-flex shrink-0 items-center gap-1 text-sm text-neutral-950"
            aria-label={`${rating.toFixed(1)} out of 5 stars`}
          >
            {rating.toFixed(1)}
            <Star
              className="size-4 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
          </span>
        </div>

        <p className="m-0 text-sm text-neutral-600">{formattedPrice}</p>
      </CardContent>
    </Card>
  );
}

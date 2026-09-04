import { Star } from "lucide-react";

import { cn } from "@/utils/cn";

interface ReviewStarsProps {
  rating: number;
  label: string;
  className?: string;
  starClassName?: string;
}

const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

export default function ReviewStars({
  rating,
  label,
  className,
  starClassName,
}: ReviewStarsProps) {
  return (
    <div
      className={cn("flex gap-1 text-amber-500", className)}
      aria-label={label}
    >
      {STAR_POSITIONS.map((position) => (
        <Star
          key={position}
          aria-hidden="true"
          className={cn(
            "size-4",
            position <= Math.round(rating) && "fill-current",
            starClassName,
          )}
        />
      ))}
    </div>
  );
}

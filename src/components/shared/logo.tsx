import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  imageClassName?: string;
}

export function Logo({ className, imageClassName }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Game Piece Labs - Trang chủ"
      className={cn(
        "inline-flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:gap-3",
        className,
      )}
    >
      <Image
        src="/brand/game-piece-labs-mark.png"
        alt="Game Piece Labs - Phụ kiện boardgame"
        width={512}
        height={512}
        loading="eager"
        className={cn("size-14 object-contain", imageClassName)}
      />
      <span className="whitespace-nowrap text-sm font-bold tracking-[0.08em] text-foreground sm:text-lg xl:text-xl">
        GAME PIECE LABS
        <div className="text-[12px] italic text-center">Phụ kiện & Boardgame</div>
      </span>
    </Link>
  );
}

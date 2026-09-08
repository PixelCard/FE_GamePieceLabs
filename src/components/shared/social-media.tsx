"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import type { IconType } from "react-icons";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";

export interface SocialMediaItem {
  platform: string;
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface SocialMediaRailProps {
  items: SocialMediaItem[];
  side?: "left" | "right";
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const socialIcons: Record<string, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
};

interface SocialLinkProps {
  item: SocialMediaItem;
  railSide: "left" | "right";
  railOpen: boolean;
}

function SocialLink({ item, railSide, railOpen }: SocialLinkProps) {
  const Icon = socialIcons[item.platform.toLowerCase()];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          tabIndex={railOpen ? 0 : -1}
          className={cn(
            "flex size-11 items-center justify-center text-muted-foreground",
            "transition-colors hover:bg-accent hover:text-accent-foreground",
            "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
            "sm:size-12",
          )}
        >
          <span
            aria-hidden="true"
            className="flex size-5 items-center justify-center text-lg sm:text-xl"
          >
            {item.icon ??
              (Icon ? <Icon /> : item.label.slice(0, 1).toUpperCase())}
          </span>
        </a>
      </TooltipTrigger>
      <TooltipContent
        side={railSide === "right" ? "left" : "right"}
        className="rounded-md border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md"
      >
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
}

export function SocialMediaRail({
  items,
  side = "right",
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
}: SocialMediaRailProps) {
  const listId = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  function handleOpenChange(nextOpen: boolean): void {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  const opensTowardLeft = side === "right";

  return (
    <TooltipProvider>
      <aside
        aria-label="Social media links"
        className={cn(
          "fixed top-1/2 z-50 flex -translate-y-1/2 items-center transition-transform duration-300 ease-in-out motion-reduce:transition-none",
          side === "right" ? "right-0" : "left-0 flex-row-reverse",
          !isOpen &&
            (side === "right"
              ? "translate-x-[calc(100%-2.75rem)] sm:translate-x-[calc(100%-3rem)]"
              : "-translate-x-[calc(100%-2.75rem)] sm:-translate-x-[calc(100%-3rem)]"),
          className,
        )}
      >
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-label={
            isOpen ? "Close social media links" : "Open social media links"
          }
          onClick={() => handleOpenChange(!isOpen)}
          className={cn(
            "relative z-10 size-11 rounded-none bg-background shadow-md sm:size-12",
            side === "right"
              ? "rounded-l-xl border-r-0"
              : "rounded-r-xl border-l-0",
          )}
        >
          {isOpen === opensTowardLeft ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </Button>

        <nav
          id={listId}
          aria-label="Follow us"
          aria-hidden={!isOpen}
          className={cn(
            "overflow-hidden border border-border bg-background text-foreground shadow-lg",
            side === "right" ? "rounded-l-xl" : "rounded-r-xl",
            !isOpen && "pointer-events-none",
          )}
        >
          <div className="flex flex-col divide-y divide-border">
            {items.map((item) => (
              <SocialLink
                key={`${item.platform}-${item.href}`}
                item={item}
                railSide={side}
                railOpen={isOpen}
              />
            ))}
          </div>
        </nav>
      </aside>
    </TooltipProvider>
  );
}

export default SocialMediaRail;

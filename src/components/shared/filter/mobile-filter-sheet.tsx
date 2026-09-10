"use client";

import type { ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MobileFilterSheetProps {
  children: ReactNode;
  disabled?: boolean;
  title: string;
}

export function MobileFilterSheet({
  children,
  disabled = false,
  title,
}: MobileFilterSheetProps) {
  return (
    <Sheet>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="default"
                size="default"
                disabled={disabled}
                aria-label={`Open ${title.toLowerCase()} filter`}
                className="rounded-full py-6 px-8"
              >
                <SlidersHorizontal />
                Filter and sort
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SheetContent
        side="bottom"
        className="max-h-[85dvh] overflow-y-auto rounded-t-2xl px-5 pb-8 pt-2"
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-muted-foreground/30" />
        <SheetHeader className="px-0 pb-5 pt-4">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}

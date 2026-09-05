"use client";

import DropdownMenu, {
  type DropdownMenuEntry,
} from "@/components/shared/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

export interface CountedFilterItem {
  id: string;
  label: string;
  count: number;
}

export interface TypeFilterProps {
  title?: string;
  items: readonly CountedFilterItem[];
}

export default function TypeFilter({
  items,
  title = "Product",
}: TypeFilterProps) {
  const triggerId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const dropdownItems: DropdownMenuEntry[] = [
    {
      id: "product-type-options",
      type: "group",
      props: {
        className: "grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-2",
      },
      items: items.map((item) => ({
        id: item.id,
        type: "item",
        label: `${item.label} (${item.count})`,
        props: {
          onSelect: () => setSelectedId(item.id),
          className: cn(
            "justify-center rounded-lg px-4 py-4 text-center text-base text-muted-foreground transition-colors sm:py-5",
            selectedId === item.id &&
              "bg-accent font-semibold text-accent-foreground",
          ),
        },
      })),
    },
  ];

  return (
    <DropdownMenu
      items={dropdownItems}
      rootProps={{ open: isOpen, onOpenChange: setIsOpen }}
      triggerProps={{ asChild: true }}
      contentProps={{
        align: "center",
        sideOffset: 12,
        className:
          "w-xl max-w-[calc(100vw-2rem)] rounded-xl border-border p-3 shadow-lg sm:p-4",
      }}
      trigger={
        <Button
          id={triggerId}
          type="button"
          variant="ghost"
          aria-label={`Filter by ${title.toLowerCase()} type`}
          className="group h-auto gap-3 rounded-full bg-transparent p-0 text-base shadow-none hover:bg-transparent active:translate-y-0"
        >
          <span className="shrink-0 text-sm font-bold text-foreground sm:text-base">
            {title} type
          </span>
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "size-4 transition-transform duration-300",
                isOpen && "rotate-180",
              )}
            />
          </span>
        </Button>
      }
    />
  );
}

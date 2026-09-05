"use client";

import DropdownMenu, {
  type DropdownMenuEntry,
} from "@/components/shared/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

interface FilterTypeProps {
  title?: string;
  type: "type";
}

interface FilterPriceProps {
  type: "price";
}

interface SortFilterProps {
  type: "sort";
  items: string[];
}

type FilterProps = FilterTypeProps | FilterPriceProps | SortFilterProps;

export default function Filter(props: FilterProps) {
  switch (props.type) {
    case "type":
      return <FilterType title={props.title} />;
    case "price":
      return <FilterPrice />;
    case "sort":
      return <SortFilter items={props.items} />;
  }
}

function FilterType({ title = "Price" }: { title?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <Label
        htmlFor={""}
        className="shrink-0 text-sm font-bold text-foreground sm:text-base"
      >
        {`${title} type`}
      </Label>
    </div>
  );
}

function FilterPrice() {
  return <>2</>;
}

interface InnerSortFilterProps {
  items: string[];
}

function SortFilter({ items }: InnerSortFilterProps) {
  const triggerId = useId();
  const defaultValue = items.includes("best selling")
    ? "best selling"
    : (items[0] ?? "");
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const currentValue = items.includes(selectedValue)
    ? selectedValue
    : (items[0] ?? "");

  const dropdownItems: DropdownMenuEntry[] = [
    {
      id: "sort-options",
      type: "radio-group",
      props: {
        value: currentValue,
        onValueChange: setSelectedValue,
      },
      items: items.map((item) => ({
        id: item,
        label: item,
        props: {
          value: item,
          className: "cursor-pointer rounded-lg px-3 py-2 text-sm capitalize",
        },
      })),
    },
  ];

  return (
    <div className="inline-flex items-center gap-2">
      <Label
        htmlFor={triggerId}
        className="shrink-0 text-sm font-bold text-foreground sm:text-base"
      >
        Sort by:
      </Label>

      <DropdownMenu
        items={dropdownItems}
        rootProps={{
          open: isOpen,
          onOpenChange: setIsOpen,
        }}
        triggerProps={{ asChild: true }}
        contentProps={{
          align: "end",
          sideOffset: 8,
          className: "min-w-56 rounded-xl p-1.5",
        }}
        trigger={
          <Button
            id={triggerId}
            type="button"
            variant="ghost"
            aria-label={`Sort products by ${currentValue || "an option"}`}
            className="group h-auto gap-2 rounded-full bg-transparent p-0 text-sm font-normal text-foreground shadow-none hover:bg-transparent active:translate-y-0 sm:text-base"
          >
            <span className="relative capitalize after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
              {currentValue || "Select option"}
            </span>

            <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
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
    </div>
  );
}

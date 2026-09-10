import { Children, isValidElement, type ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import PriceFilter, {
  type PriceFilterProps,
} from "@/components/shared/filter/price-filter";
import SortFilter, {
  type SortFilterProps,
} from "@/components/shared/filter/sort-filter";
import SwitchFilter, {
  type SwitchFilterProps,
} from "@/components/shared/filter/switch-filter";
import TypeFilter, {
  type TypeFilterProps,
} from "@/components/shared/filter/type-filter";
import { MobileFilterSheet } from "@/components/shared/filter/mobile-filter-sheet";
import { cn } from "@/utils/cn";

type FilterVariantProps =
  | ({ variant: "price" } & PriceFilterProps)
  | ({ variant: "sort" } & SortFilterProps)
  | ({ variant: "switch" } & SwitchFilterProps)
  | ({ variant: "type" } & TypeFilterProps);

export type FilterProps = FilterVariantProps & {
  presentation?: "desktop" | "mobile-content";
  wrapperClassName?: string;
};

function withoutWrapperProps<
  T extends {
    presentation?: "desktop" | "mobile-content";
    variant: string;
    wrapperClassName?: string;
  },
>(props: T): Omit<T, "presentation" | "variant" | "wrapperClassName"> {
  const { presentation, variant, wrapperClassName, ...componentProps } = props;
  void presentation;
  void variant;
  void wrapperClassName;

  return componentProps;
}

interface FilterWrapperProps {
  children: ReactNode;
  className?: string;
}

function FilterWrapperDesktop({ children, className }: FilterWrapperProps) {
  return (
    <div
      className={cn(
        "inline-flex min-w-0 py-1 max-sm:hidden sm:mx-2 sm:px-2 sm:py-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface FilterMobileGroupProps {
  children: ReactNode;
  className?: string;
}

const mobileFilterTitles = {
  price: "Price",
  sort: "Sort by",
  switch: "Availability",
  type: "Product type",
} satisfies Record<FilterVariantProps["variant"], string>;

export function FilterMobileGroup({
  children,
  className,
}: FilterMobileGroupProps) {
  return (
    <FilterWrapperMobile
      className={cn(
        "fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2",
        className,
      )}
    >
      <MobileFilterSheet title="Filters">
        <Accordion type="multiple">
          {Children.toArray(children).map((child) => {
            if (!isValidElement<FilterProps>(child)) {
              return child;
            }

            const variant = child.props.variant;

            return (
              <AccordionItem key={variant} value={variant}>
                <AccordionTrigger className="font-bold">
                  {mobileFilterTitles[variant]}
                </AccordionTrigger>
                <AccordionContent className="pt-2">{child}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </MobileFilterSheet>
    </FilterWrapperMobile>
  );
}

function FilterWrapperMobile({ children, className }: FilterWrapperProps) {
  return (
    <div className={cn("inline-flex min-w-0 py-1 sm:hidden", className)}>
      {children}
    </div>
  );
}

export default function Filter(props: FilterProps) {
  if (props.presentation === "mobile-content") {
    switch (props.variant) {
      case "price":
        return (
          <PriceFilter
            {...withoutWrapperProps(props)}
            presentation="mobile-content"
          />
        );
      case "sort":
        return (
          <SortFilter
            {...withoutWrapperProps(props)}
            presentation="mobile-content"
          />
        );
      case "switch":
        return (
          <SwitchFilter
            {...withoutWrapperProps(props)}
            presentation="mobile-content"
          />
        );
      case "type":
        return (
          <TypeFilter
            {...withoutWrapperProps(props)}
            presentation="mobile-content"
          />
        );
    }
  }

  switch (props.variant) {
    case "price":
      return (
        <>
          <FilterWrapperDesktop className={props.wrapperClassName}>
            <PriceFilter
              {...withoutWrapperProps(props)}
              presentation="desktop"
            />
          </FilterWrapperDesktop>
        </>
      );
    case "sort":
      return (
        <>
          <FilterWrapperDesktop className={props.wrapperClassName}>
            <SortFilter
              {...withoutWrapperProps(props)}
              presentation="desktop"
            />
          </FilterWrapperDesktop>
        </>
      );
    case "switch":
      return (
        <>
          <FilterWrapperDesktop className={props.wrapperClassName}>
            <SwitchFilter
              {...withoutWrapperProps(props)}
              presentation="desktop"
            />
          </FilterWrapperDesktop>
        </>
      );
    case "type":
      return (
        <>
          <FilterWrapperDesktop className={props.wrapperClassName}>
            <TypeFilter
              {...withoutWrapperProps(props)}
              presentation="desktop"
            />
          </FilterWrapperDesktop>
        </>
      );
  }
}

export type {
  CountedFilterItem,
  TypeFilterProps,
} from "@/components/shared/filter/type-filter";
export type {
  PriceCurrency,
  PriceFilterProps,
  PriceRange,
} from "@/components/shared/filter/price-filter";
export type { SortFilterProps } from "@/components/shared/filter/sort-filter";
export type { SwitchFilterProps } from "@/components/shared/filter/switch-filter";

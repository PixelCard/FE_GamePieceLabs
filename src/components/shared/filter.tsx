import type { ReactNode } from "react";

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
import { cn } from "@/utils/cn";

type FilterVariantProps =
  | ({ variant: "price" } & PriceFilterProps)
  | ({ variant: "sort" } & SortFilterProps)
  | ({ variant: "switch" } & SwitchFilterProps)
  | ({ variant: "type" } & TypeFilterProps);

export type FilterProps = FilterVariantProps & {
  wrapperClassName?: string;
};

function withoutWrapperProps<
  T extends { variant: string; wrapperClassName?: string },
>(
  props: T,
): Omit<T, "variant" | "wrapperClassName"> {
  const { variant, wrapperClassName, ...componentProps } = props;
  void variant;
  void wrapperClassName;

  return componentProps;
}

interface FilterWrapperProps {
  children: ReactNode;
  className?: string;
}

function FilterWrapper({ children, className }: FilterWrapperProps) {
  return (
    <div className={cn("mx-2 inline-flex px-2 py-2", className)}>
      {children}
    </div>
  );
}

export default function Filter(props: FilterProps) {
  switch (props.variant) {
    case "price":
      return (
        <FilterWrapper className={props.wrapperClassName}>
          <PriceFilter {...withoutWrapperProps(props)} />
        </FilterWrapper>
      );
    case "sort":
      return (
        <FilterWrapper className={props.wrapperClassName}>
          <SortFilter {...withoutWrapperProps(props)} />
        </FilterWrapper>
      );
    case "switch":
      return (
        <FilterWrapper className={props.wrapperClassName}>
          <SwitchFilter {...withoutWrapperProps(props)} />
        </FilterWrapper>
      );
    case "type":
      return (
        <FilterWrapper className={props.wrapperClassName}>
          <TypeFilter {...withoutWrapperProps(props)} />
        </FilterWrapper>
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

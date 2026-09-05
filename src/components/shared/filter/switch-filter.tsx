"use client";

import type { ComponentProps, ReactNode } from "react";
import { useId, useState } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils/cn";

type SwitchProps = ComponentProps<typeof Switch>;

export interface SwitchFilterProps
  extends Omit<
    SwitchProps,
    "checked" | "defaultChecked" | "id" | "onCheckedChange" | "type"
  > {
  label: ReactNode;
  activeLabel?: ReactNode;
  badgeProps?: Omit<ComponentProps<typeof Badge>, "children">;
  checked?: boolean;
  clearable?: boolean;
  clearButtonProps?: Omit<
    ComponentProps<typeof Button>,
    "children" | "onClick"
  >;
  defaultChecked?: boolean;
  description?: ReactNode;
  descriptionClassName?: string;
  id?: string;
  labelClassName?: string;
  labelPosition?: "left" | "right";
  onCheckedChange?: (checked: boolean) => void;
  onClear?: () => void;
  rootClassName?: string;
  showActiveBadge?: boolean;
  switchType?: SwitchProps["type"];
}

export default function SwitchFilter({
  activeLabel,
  badgeProps,
  checked,
  clearable = true,
  clearButtonProps,
  defaultChecked = false,
  description,
  descriptionClassName,
  disabled,
  id,
  label,
  labelClassName,
  labelPosition = "left",
  onCheckedChange,
  onClear,
  rootClassName,
  showActiveBadge = false,
  switchType = "button",
  ...switchProps
}: SwitchFilterProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = checked ?? internalChecked;

  function updateChecked(nextChecked: boolean): void {
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
  }

  function clearFilter(): void {
    updateChecked(false);
    onClear?.();
  }

  return (
    <div className={cn("inline-flex flex-col items-start gap-2", rootClassName)}>
      <div
        className={cn(
          "inline-flex items-center gap-3",
          labelPosition === "right" && "flex-row-reverse",
        )}
      >
        <div className="flex flex-col gap-0.5">
          <Label
            htmlFor={switchId}
            className={cn(
              "cursor-pointer text-sm font-bold text-foreground sm:text-base",
              disabled && "cursor-not-allowed opacity-50",
              labelClassName,
            )}
          >
            {label}
          </Label>
          {description ? (
            <span
              className={cn(
                "text-xs text-muted-foreground",
                descriptionClassName,
              )}
            >
              {description}
            </span>
          ) : null}
        </div>

        <Switch
          id={switchId}
          type={switchType}
          checked={isChecked}
          disabled={disabled}
          onCheckedChange={updateChecked}
          {...switchProps}
        />
      </div>

      {showActiveBadge && isChecked ? (
        <Badge
          {...badgeProps}
          className={cn(
            "gap-2 rounded-4xl border-0 bg-gray-200 px-5 py-6 text-sm font-medium text-black",
            badgeProps?.className,
          )}
        >
          {activeLabel ?? label}
          {clearable ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Clear switch filter"
              {...clearButtonProps}
              className={cn(
                "size-5 rounded-full p-0 hover:bg-foreground/10",
                clearButtonProps?.className,
              )}
              onClick={clearFilter}
            >
              <X aria-hidden="true" className="size-3.5" />
            </Button>
          ) : null}
        </Badge>
      ) : null}
    </div>
  );
}

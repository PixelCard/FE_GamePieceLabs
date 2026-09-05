"use client";

import type { ComponentProps, ReactNode } from "react";

import {
  DropdownMenu as DropdownMenuRoot,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type WithoutChildren<T> = Omit<T, "children">;

export interface DropdownMenuActionItem {
  id: string;
  type: "item";
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: ReactNode;
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuItem>>;
}

export interface DropdownMenuCheckboxEntry {
  id: string;
  type: "checkbox";
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: ReactNode;
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuCheckboxItem>>;
}

export interface DropdownMenuCustomEntry {
  id: string;
  type: "custom";
  children: ReactNode;
  props?: WithoutChildren<ComponentProps<"div">>;
}

export interface DropdownMenuLabelEntry {
  id: string;
  type: "label";
  label: ReactNode;
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuLabel>>;
}

export interface DropdownMenuSeparatorEntry {
  id: string;
  type: "separator";
  props?: ComponentProps<typeof DropdownMenuSeparator>;
}

export interface DropdownMenuGroupEntry {
  id: string;
  type: "group";
  items: DropdownMenuEntry[];
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuGroup>>;
}

export interface DropdownMenuRadioItemEntry {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: ReactNode;
  props: WithoutChildren<ComponentProps<typeof DropdownMenuRadioItem>>;
}

export interface DropdownMenuRadioGroupEntry {
  id: string;
  type: "radio-group";
  items: DropdownMenuRadioItemEntry[];
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuRadioGroup>>;
}

export interface DropdownMenuSubEntry {
  id: string;
  type: "sub";
  label: ReactNode;
  icon?: ReactNode;
  items: DropdownMenuEntry[];
  props?: WithoutChildren<ComponentProps<typeof DropdownMenuSub>>;
  triggerProps?: WithoutChildren<
    ComponentProps<typeof DropdownMenuSubTrigger>
  >;
  contentProps?: WithoutChildren<
    ComponentProps<typeof DropdownMenuSubContent>
  >;
}

export type DropdownMenuEntry =
  | DropdownMenuActionItem
  | DropdownMenuCheckboxEntry
  | DropdownMenuCustomEntry
  | DropdownMenuGroupEntry
  | DropdownMenuLabelEntry
  | DropdownMenuRadioGroupEntry
  | DropdownMenuSeparatorEntry
  | DropdownMenuSubEntry;

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuEntry[];
  rootProps?: WithoutChildren<ComponentProps<typeof DropdownMenuRoot>>;
  triggerProps?: WithoutChildren<ComponentProps<typeof DropdownMenuTrigger>>;
  contentProps?: WithoutChildren<ComponentProps<typeof DropdownMenuContent>>;
}

function ItemContent({
  icon,
  label,
  shortcut,
}: Pick<
  DropdownMenuActionItem,
  "icon" | "label" | "shortcut"
>): ReactNode {
  return (
    <>
      {icon}
      <span>{label}</span>
      {shortcut ? (
        <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
      ) : null}
    </>
  );
}

function renderEntries(items: DropdownMenuEntry[]): ReactNode {
  return items.map((entry) => {
    switch (entry.type) {
      case "item": {
        return (
          <DropdownMenuItem key={entry.id} {...entry.props}>
            <ItemContent
              icon={entry.icon}
              label={entry.label}
              shortcut={entry.shortcut}
            />
          </DropdownMenuItem>
        );
      }

      case "checkbox": {
        return (
          <DropdownMenuCheckboxItem key={entry.id} {...entry.props}>
            <ItemContent
              icon={entry.icon}
              label={entry.label}
              shortcut={entry.shortcut}
            />
          </DropdownMenuCheckboxItem>
        );
      }

      case "custom": {
        return (
          <div key={entry.id} {...entry.props}>
            {entry.children}
          </div>
        );
      }

      case "label": {
        return (
          <DropdownMenuLabel key={entry.id} {...entry.props}>
            {entry.label}
          </DropdownMenuLabel>
        );
      }

      case "separator": {
        return <DropdownMenuSeparator key={entry.id} {...entry.props} />;
      }

      case "group": {
        return (
          <DropdownMenuGroup key={entry.id} {...entry.props}>
            {renderEntries(entry.items)}
          </DropdownMenuGroup>
        );
      }

      case "radio-group": {
        return (
          <DropdownMenuRadioGroup key={entry.id} {...entry.props}>
            {entry.items.map((radioItem) => (
              <DropdownMenuRadioItem key={radioItem.id} {...radioItem.props}>
                <ItemContent
                  icon={radioItem.icon}
                  label={radioItem.label}
                  shortcut={radioItem.shortcut}
                />
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        );
      }

      case "sub": {
        return (
          <DropdownMenuSub key={entry.id} {...entry.props}>
            <DropdownMenuSubTrigger {...entry.triggerProps}>
              {entry.icon}
              <span>{entry.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent {...entry.contentProps}>
              {renderEntries(entry.items)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }
    }
  });
}

export function DropdownMenu({
  contentProps,
  items,
  rootProps,
  trigger,
  triggerProps,
}: DropdownMenuProps) {
  return (
    <DropdownMenuRoot {...rootProps}>
      <DropdownMenuTrigger {...triggerProps}>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent {...contentProps}>
        {renderEntries(items)}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

export default DropdownMenu;

"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FooterPreferenceOption } from "@/features/navigation/types/footer-navigation";

type PreferenceMenuProps = {
  accessibleLabel: string;
  options: FooterPreferenceOption[];
  value: string;
  onValueChange: (value: string) => void;
};

function PreferenceMenu({
  accessibleLabel,
  options,
  value,
  onValueChange,
}: PreferenceMenuProps) {
  const activeOption = options.find((option) => option.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 px-3 font-bold text-foreground hover:bg-muted"
          aria-label={accessibleLabel}
        >
          {activeOption?.prefix ? (
            <span aria-hidden="true">{activeOption.prefix}</span>
          ) : null}
          {activeOption?.label ?? value}
          <ChevronDown className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" className="min-w-40">
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.prefix ? <span aria-hidden="true">{option.prefix}</span> : null}
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type FooterPreferencesProps = {
  currencyOptions: FooterPreferenceOption[];
  languageOptions: FooterPreferenceOption[];
  defaultCurrency: string;
  defaultLanguage: string;
};

export function FooterPreferences({
  currencyOptions,
  languageOptions,
  defaultCurrency,
  defaultLanguage,
}: FooterPreferencesProps) {
  const [currency, setCurrency] = useState(defaultCurrency);
  const [language, setLanguage] = useState(defaultLanguage);

  return (
    <div className="flex flex-wrap items-center justify-end gap-1">
      <PreferenceMenu
        accessibleLabel="Choose currency"
        options={currencyOptions}
        value={currency}
        onValueChange={setCurrency}
      />
      <PreferenceMenu
        accessibleLabel="Choose language"
        options={languageOptions}
        value={language}
        onValueChange={setLanguage}
      />
    </div>
  );
}

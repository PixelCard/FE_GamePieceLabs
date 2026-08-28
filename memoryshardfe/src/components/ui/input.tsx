import * as React from "react";

import { cn } from "@/utils/cn";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        [
          "h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-2",
          "text-sm text-slate-950 outline-none transition duration-200",
          "placeholder:text-slate-400",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
          "file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white",
          "dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500",
          "dark:disabled:bg-white/10 dark:disabled:text-slate-500",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

export { Input };
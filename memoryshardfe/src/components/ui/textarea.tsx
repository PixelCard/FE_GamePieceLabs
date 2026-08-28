import * as React from "react";

import { cn } from "@/utils/cn";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        [
          "min-h-[112px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3",
          "text-sm text-slate-950 outline-none transition duration-200",
          "placeholder:text-slate-400",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
          "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
          "dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
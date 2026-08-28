type ProductStatusBadgeProps = {
  quantity: number;
};

export function getStockStatus(quantity: number) {
  if (quantity <= 0) {
    return {
      label: "Out of Stock",
      className:
        "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300",
    };
  }

  if (quantity <= 15) {
    return {
      label: "Low Stock",
      className:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
    };
  }

  return {
    label: "Active",
    className:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
  };
}

export default function ProductStatusBadge({
  quantity,
}: ProductStatusBadgeProps) {
  const status = getStockStatus(quantity);

  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${status.className}`}
    >
      {status.label}
    </span>
  );
}
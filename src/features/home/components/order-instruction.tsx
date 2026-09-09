import { type ReactElement } from "react";
import {
  BadgeCheck,
  HandCoins,
  MessageCircleMore,
  PackageCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

import {
  orderInstructions,
  type OrderInstructionIcon,
} from "@/features/home/data/order-instructions";

const instructionIcons: Record<OrderInstructionIcon, LucideIcon> = {
  consultation: MessageCircleMore,
  quote: BadgeCheck,
  deposit: HandCoins,
  completion: PackageCheck,
  delivery: Truck,
};

export type OrderInstructionVariant = "default" | "interactive";

export function OrderInstruction({
}): ReactElement {
 
  return (
    <section
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
      aria-labelledby="order-instruction-title"
    >
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 xl:px-[50px]">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14 lg:mb-16">
          <h2
            id="order-instruction-title"
            className="type-h2 text-balance text-neutral-900 dark:text-white"
          >
            Từ ý tưởng đến sản phẩm hoàn thiện
          </h2>
          <p className="type-prose mx-auto mt-4 max-w-xl text-base text-neutral-600 dark:text-neutral-400">
            Quy trình đặt in 3D rõ ràng trong 5 bước, giúp bạn dễ dàng theo
            dõi từ lúc chọn mẫu đến khi nhận hàng.
          </p>
        </div>

        <ol className="relative grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-5 xl:gap-4 2xl:gap-6">
          {orderInstructions.map((instruction) => {
            const Icon = instructionIcons[instruction.icon];

            return (
              <li
                key={instruction.id}
                className="group relative flex min-h-64 flex-col rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_12px_36px_-24px_rgba(23,23,23,0.28)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_18px_44px_-24px_rgba(23,23,23,0.32)] md:p-6 xl:min-h-80"
              >
                <div className="relative z-10 mb-6 flex items-center justify-between xl:mb-8">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-yellow-400 text-neutral-950 ring-1 ring-yellow-500/20 transition-colors duration-300 group-hover:bg-yellow-300">
                    <Icon
                      className="size-6"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="type-eyebrow rounded-full bg-amber-50 px-3 py-1 text-amber-800 ring-1 ring-amber-200/70 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20">
                    Bước {String(instruction.id).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-lg leading-snug font-bold text-neutral-900 dark:text-white">
                  {instruction.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {instruction.description}
                </p>

                <div className="mt-auto pt-6" aria-hidden="true">
                  <span className="block h-1 w-10 rounded-full bg-yellow-400 transition-[width] duration-300 group-hover:w-16" />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

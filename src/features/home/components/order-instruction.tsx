"use client";

import { useEffect, useState, type ReactElement } from "react";
import {
  BadgeCheck,
  HandCoins,
  MessageCircleQuestion,
  MessageCircleMore,
  PackageCheck,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

interface TypingTextProps {
  text: string;
}

function TypingText({ text }: TypingTextProps): ReactElement {
  const characters = Array.from(text);
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(0);

  useEffect(() => {
    const characterCount = Array.from(text).length;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timeoutId = window.setTimeout(
        () => setVisibleCharacterCount(characterCount),
        0
      );

      return () => window.clearTimeout(timeoutId);
    }

    const intervalId = window.setInterval(() => {
      setVisibleCharacterCount((currentCount) => {
        if (currentCount >= characterCount) {
          window.clearInterval(intervalId);
          return currentCount;
        }

        return currentCount + 1;
      });
    }, 18);

    return () => window.clearInterval(intervalId);
  }, [text]);

  const isTyping = visibleCharacterCount < characters.length;

  return (
    <>
      <span aria-hidden="true">
        {characters.slice(0, visibleCharacterCount).join("")}
        <span
          className={isTyping ? "ml-0.5 animate-pulse text-amber-400" : "hidden"}
        >
          |
        </span>
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}

export function OrderInstruction(): ReactElement {
  return (
    <section
      className="relative isolate overflow-hidden bg-neutral-100 py-16 sm:py-20 lg:py-28 dark:bg-neutral-950"
      aria-labelledby="order-instruction-title"
    >
      <div
        className="absolute top-0 right-0 -z-10 size-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-500/10"
        aria-hidden="true"
      />
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1580px] sm:w-[calc(100%-3rem)] xl:w-[calc(100%-100px)]">
        <div className="mb-10 w-1/2 mx-auto text-center lg:mb-14">
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-amber-600 uppercase sm:text-sm dark:text-amber-400">
            Đơn giản và minh bạch
          </p>
          <h2
            id="order-instruction-title"
            className="type-h2 text-neutral-950 dark:text-white"
          >
            Quy trình đặt in mẫu 3D
          </h2>
          <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base dark:text-neutral-400">
            Từ ý tưởng ban đầu đến khi sản phẩm được giao tận tay bạn.
          </p>
        </div>

        <ol className="space-y-4 lg:hidden">
          {orderInstructions.map((instruction) => {
            const Icon = instructionIcons[instruction.icon];

            return (
              <li
                key={instruction.id}
                className="relative flex gap-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900"
              >
                {instruction.id < orderInstructions.length ? (
                  <span
                    className="absolute top-16 bottom-[-1.1rem] left-9 w-px bg-neutral-300 dark:bg-neutral-700"
                    aria-hidden="true"
                  />
                ) : null}

                <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-white shadow-sm dark:bg-amber-400 dark:text-neutral-950">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>

                <div className="min-w-0 pt-0.5">
                  <p className="mb-1 text-xs font-bold tracking-wider text-amber-600 uppercase dark:text-amber-400">
                    Bước {instruction.id}
                  </p>
                  <h3 className="text-base font-bold leading-6 text-neutral-950 dark:text-white">
                    {instruction.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                    {instruction.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <TooltipProvider delayDuration={150}>
          <div className="hidden lg:block">
            <ol className="grid grid-cols-5 gap-6 xl:gap-10">
              {orderInstructions.map((instruction) => {
                const Icon = instructionIcons[instruction.icon];

                return (
                  <li key={instruction.id} className="min-w-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="group flex w-full flex-col items-center rounded-3xl px-2 py-3 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-neutral-950"
                          aria-label={`Bước ${instruction.id}: ${instruction.title}. ${instruction.description}`}
                        >
                          <span className="relative mb-5 flex size-20 items-center justify-center">
                            <span className="flex size-16 items-center justify-center rounded-full bg-neutral-950 text-white shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-amber-400 group-hover:text-neutral-950 group-focus-visible:bg-amber-400 group-focus-visible:text-neutral-950 dark:bg-white dark:text-neutral-950">
                              <Icon className="size-6" aria-hidden="true" />
                            </span>

                            <span className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full border-2 border-neutral-100 bg-amber-400 text-neutral-950 shadow-md transition duration-300 group-hover:scale-110 dark:border-neutral-950">
                              <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/25 motion-reduce:hidden" />
                              <MessageCircleQuestion
                                className="relative size-3.5"
                                aria-hidden="true"
                              />
                            </span>
                          </span>

                          <span className="max-w-56 text-base font-bold leading-snug text-neutral-950 transition-colors group-hover:text-amber-700 xl:text-lg dark:text-white dark:group-hover:text-amber-400">
                            {instruction.title}
                          </span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        sideOffset={14}
                        className="w-88 overflow-hidden border-neutral-800 bg-neutral-950 p-0 text-left text-white shadow-2xl"
                      >
                        <div className="min-h-24 px-5 py-4 text-sm leading-6 text-neutral-100">
                          <TypingText text={instruction.description} />
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              })}
            </ol>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Globe2,
  MapPin,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  ContactBenefitIcon,
  ContactPageContent as ContactPageContentType,
} from "@/features/contact/types/contact-content";

const benefitIcons: Record<ContactBenefitIcon, LucideIcon> = {
  "map-pin": MapPin,
  globe: Globe2,
  messages: MessagesSquare,
  "credit-card": CreditCard,
};

type ContactPageProps = {
  content: ContactPageContentType;
};

export function ContactPage({ content }: ContactPageProps) {
  return (
    <main className="bg-neutral-100 text-neutral-950">
      <section
        className="relative isolate h-44 overflow-hidden sm:h-52 lg:h-60"
        aria-labelledby="contact-page-title"
      >
        <Image
          src={content.hero.imageSrc}
          alt={content.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <h1
            id="contact-page-title"
            className="type-h1 text-white drop-shadow-sm"
          >
            {content.hero.title}
          </h1>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 xl:px-8 xl:py-20">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 xl:gap-20">
          <div className="max-w-2xl">
            <p className="text-base font-bold text-red-600">
              {content.introduction.eyebrow}
            </p>
            <h2 className="type-h2 mt-5">
              {content.introduction.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.6] text-neutral-600">
              {content.introduction.description}{" "}
              <Link
                href={content.introduction.faqHref}
                className="font-semibold text-neutral-950 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-red-600 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
              >
                {content.introduction.faqLabel}
              </Link>
              .
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {content.details.map((detail) => (
                <div key={detail.label} className="border-l-2 border-red-600 pl-4">
                  <dt className="text-base font-bold text-neutral-950">
                    {detail.label}
                  </dt>
                  <dd className="mt-1 text-base leading-[1.6] text-neutral-700">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="font-semibold underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-red-600"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span className="font-semibold">{detail.value}</span>
                    )}
                    {detail.supportingText ? (
                      <span className="mt-1 block text-neutral-500">
                        {detail.supportingText}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Card className="self-start border-white/80 shadow-[0_22px_70px_rgba(23,23,23,0.08)]">
            <form className="grid gap-4 p-5 sm:grid-cols-2 sm:gap-5 sm:p-8 lg:p-10">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Name
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder={content.form.namePlaceholder}
                  required
                  className="h-14 rounded-xl border-neutral-200 px-5 text-base"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  E-mail
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={content.form.emailPlaceholder}
                  required
                  className="h-14 rounded-xl border-neutral-200 px-5 text-base"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-subject" className="sr-only">
                  Subject
                </label>
                <Input
                  id="contact-subject"
                  name="subject"
                  placeholder={content.form.subjectPlaceholder}
                  required
                  className="h-14 rounded-xl border-neutral-200 px-5 text-base"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder={content.form.messagePlaceholder}
                  required
                  className="min-h-36 rounded-xl border-neutral-200 px-5 py-4 text-base"
                />
              </div>
              <div className="pt-1 sm:col-span-2">
                <Button
                  type="button"
                  size="lg"
                  className="h-14 rounded-full bg-neutral-950 px-8 text-base font-bold text-white shadow-none hover:bg-red-600"
                >
                  {content.form.submitLabel}
                </Button>
              </div>
            </form>
          </Card>
        </section>

        <section
          className="mt-14 grid gap-8 border-t border-neutral-300 pt-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-10 lg:pt-12"
          aria-label="Store benefits"
        >
          {content.benefits.map((benefit) => {
            const Icon = benefitIcons[benefit.icon];

            return (
              <article key={benefit.title}>
                <Icon className="size-5 text-neutral-900" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="type-h6 mt-5">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-base leading-[1.6] text-neutral-600">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}

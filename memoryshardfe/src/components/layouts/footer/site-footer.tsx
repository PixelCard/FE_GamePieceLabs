import Link from "next/link";
import {
  Camera,
  Gem,
  MessageCircle,
  Play,
  type LucideIcon,
} from "lucide-react";

import { FooterPreferences } from "@/components/layouts/footer/footer-preferences";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type {
  FooterContent,
  FooterSocialLink,
} from "@/features/navigation/types/footer-navigation";

const socialIcons: Record<FooterSocialLink["platform"], LucideIcon> = {
  facebook: MessageCircle,
  instagram: Camera,
  youtube: Play,
};

type SiteFooterProps = {
  content: FooterContent;
};

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto w-[calc(100%-2rem)] py-12 sm:w-[calc(100%-3rem)] sm:max-w-[620px] lg:max-w-[940px] lg:py-16 xl:w-[calc(100%-100px)] xl:max-w-[1580px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:gap-16">
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
          >
            {content.navigationGroups.map((group) => (
              <section key={group.title} aria-labelledby={`footer-${group.title}`}>
                <h2
                  id={`footer-${group.title}`}
                  className="type-h6 mb-5"
                >
                  {group.title}
                </h2>
                <ul className="space-y-1.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Button
                        asChild
                        variant="ghost"
                        className="h-auto justify-start px-0 py-1.5 text-base font-medium text-muted-foreground hover:bg-transparent hover:text-foreground"
                      >
                        <Link href={link.href}>{link.label}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>

          <Card className="self-start rounded-2xl border-border bg-muted/35 shadow-none">
            <CardHeader className="p-6 sm:p-8">
              <CardTitle className="text-foreground">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  aria-label={`${content.brand.name} - Trang chủ`}
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm">
                    <Gem className="size-5" strokeWidth={2.2} />
                  </span>
                  <span className="text-xl font-bold tracking-[0.08em]">
                    {content.brand.name}
                  </span>
                </Link>
              </CardTitle>
              <CardDescription className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
                {content.brand.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Separator className="my-10 lg:my-12" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              {content.socialLinks.map((socialLink) => {
                const Icon = socialIcons[socialLink.platform];

                return (
                  <Button
                    key={socialLink.platform}
                    asChild
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full text-foreground hover:bg-muted"
                  >
                    <a href={socialLink.href} aria-label={socialLink.label}>
                      <Icon className="size-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">{content.copyright}</p>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <FooterPreferences
              currencyOptions={content.currencyOptions}
              languageOptions={content.languageOptions}
              defaultCurrency={content.defaultCurrency}
              defaultLanguage={content.defaultLanguage}
            />
            <div className="flex flex-wrap gap-2 lg:justify-end" aria-label="Payment methods">
              {content.paymentMethods.map((paymentMethod) => (
                <Badge
                  key={paymentMethod}
                  variant="outline"
                  className="h-7 rounded-md px-3 font-bold tracking-tight"
                >
                  {paymentMethod}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

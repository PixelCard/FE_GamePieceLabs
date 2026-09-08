import Image from "next/image";
import Link from "next/link";

import type { FooterContent } from "@/features/navigation/types/footer-navigation";

type SiteFooterProps = {
  content: FooterContent;
};

export function SiteFooter({ content }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto w-[calc(100%-2rem)] py-12 sm:w-[calc(100%-3rem)] sm:max-w-[620px] lg:max-w-[940px] lg:py-14 xl:w-[calc(100%-100px)] xl:max-w-[1580px]">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-16">
          {content.navigationGroups.map((group) => {
            const headingId = `footer-${group.title
              .toLowerCase()
              .replace(/\s+/g, "-")}`;

            return (
              <nav key={group.title} aria-labelledby={headingId}>
                <h2 id={headingId} className="type-h6 mb-5">
                  {group.title}
                </h2>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex rounded-sm py-1 text-base font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}

          <section aria-labelledby="footer-certifications">
            <h2
              id="footer-certifications"
              className="type-h6 mb-5"
            >
              {content.certifications.title}
            </h2>
            <div className="flex flex-col items-start gap-4">
              {content.certifications.badges.map((badge) => (
                <a
                  key={badge.label}
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={badge.label}
                  className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <Image
                    src={badge.imageSrc}
                    alt={badge.imageAlt}
                    width={badge.width}
                    height={badge.height}
                    className="h-auto max-w-full object-contain"
                  />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center">
        <p className="text-sm text-muted-foreground">{content.copyright}</p>
      </div>
    </footer>
  );
}

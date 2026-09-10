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
        <div className="grid grid-cols-2 items-start gap-x-6 gap-y-12 text-center sm:gap-8 sm:text-left lg:grid-cols-4 lg:gap-10 xl:gap-16">
          {content.navigationGroups.map((group) => {
            const headingId = `footer-${group.title
              .toLowerCase()
              .replace(/\s+/g, "-")}`;

            return (
              <nav
                key={group.title}
                aria-labelledby={headingId}
                className="min-w-0"
              >
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

          <section
            aria-labelledby="footer-certifications"
            className="col-span-2 min-w-0 lg:col-span-1"
          >
            <h2
              id="footer-certifications"
              className="type-h6 mb-5"
            >
              {content.certifications.title}
            </h2>
            <div className="flex flex-col items-center gap-4 sm:items-start">
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

          <section
            aria-labelledby="footer-fanpage"
            className="col-span-2 min-w-0 lg:col-span-1"
          >
            <h2 id="footer-fanpage" className="type-h6 mb-5">
              {content.fanpage.title}
            </h2>
            <iframe
              title="Fanpage In 3D Phụ Kiện Boardgame"
              src={content.fanpage.embedUrl}
              width="340"
              height="150"
              loading="lazy"
              className="mx-auto block aspect-[34/15] h-auto w-full max-w-[340px] border-0 sm:mx-0"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </section>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center">
        <p className="text-sm text-muted-foreground">{content.copyright}</p>
      </div>
    </footer>
  );
}

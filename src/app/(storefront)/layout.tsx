import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { SiteFooter } from "@/components/layouts/footer/site-footer";
import { SiteHeader } from "@/components/layouts/header/site-header";
import { footerContent } from "@/features/navigation/data/footer-navigation";
import Wrapper from "@/components/shared/wrapper";

const storefrontFont = Barlow({
  weight: ["500", "700"],
  style: "normal",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Board Game Store",
  description: "Discover board games and tabletop accessories at MemoryShard.",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${storefrontFont.variable} storefront-typography flex min-h-screen flex-col bg-neutral-50 text-neutral-900 antialiased selection:bg-blue-500/10`}
    >
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter content={footerContent} />
    </div>
  );
}

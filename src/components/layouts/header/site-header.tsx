"use client";

import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  CircleUserRound,
  Flame,
  Gem,
  Layers3,
  Leaf,
  Menu,
  PackageOpen,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  aboutMenuItems,
  aboutPromoCards,
  contactNavigationItem,
  productMenuItems,
  promoCards,
} from "@/features/navigation/data/header-navigation";
import type {
  HeaderNavigationItem,
  HeaderPromoCard,
} from "@/features/navigation/types/header-navigation";
import { cn } from "@/utils/cn";

const promoStyles: Record<HeaderPromoCard["tone"], string> = {
  charcoal:
    "bg-[radial-gradient(circle_at_50%_25%,#52525b_0%,#18181b_55%,#09090b_100%)]",
  ocean:
    "bg-[radial-gradient(circle_at_50%_20%,#164e63_0%,#082f49_48%,#020617_100%)]",
  walnut:
    "bg-[linear-gradient(135deg,#78350f_0%,#3f1d0b_52%,#1c0a03_100%)]",
  clay: "bg-[radial-gradient(circle_at_45%_24%,#a8a29e_0%,#57534e_52%,#1c1917_100%)]",
  sand: "bg-[linear-gradient(145deg,#f5e6c8_0%,#d6b98c_48%,#6b4f32_100%)]",
  forest:
    "bg-[radial-gradient(circle_at_45%_24%,#4d7c0f_0%,#166534_50%,#052e16_100%)]",
};

const promoIcons = {
  inserts: PackageOpen,
  hotlist: Flame,
  new: Sparkles,
  story: BookOpen,
  materials: Layers3,
  green: Leaf,
};

function Brand() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 rounded-md text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
      aria-label="MemoryShard - Trang chủ"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm">
        <Gem className="size-5" strokeWidth={2.2} />
      </span>
      <span className="text-xl font-bold tracking-[0.08em] sm:text-2xl">
        MEMORYSHARD
      </span>
    </Link>
  );
}

function PromoCard({
  promo,
  onNavigate,
}: {
  promo: HeaderPromoCard;
  onNavigate: () => void;
}) {
  const Icon = promoIcons[promo.icon];

  return (
    <Link
      href={promo.href}
      className="group rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
      onClick={onNavigate}
    >
      <Card
        className={cn(
          "relative aspect-square overflow-hidden rounded-lg border-0 text-white shadow-none transition-transform duration-200 group-hover:-translate-y-1",
          promoStyles[promo.tone],
        )}
      >
        <Icon
          className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 text-white/20 transition-transform duration-300 group-hover:scale-105"
          strokeWidth={1.1}
          aria-hidden="true"
        />
        <CardContent className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-16">
          <p className="type-h6">
            {promo.title}
          </p>
          <p className="mt-1 text-sm text-white/70">{promo.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

type MegaMenuPanelProps = {
  items: HeaderNavigationItem[];
  promos: HeaderPromoCard[];
  heightClassName: string;
  onNavigate: () => void;
};

function MegaMenuPanel({
  items,
  promos,
  heightClassName,
  onNavigate,
}: MegaMenuPanelProps) {
  return (
    <NavigationMenuContent
      className={cn(
        "!fixed !inset-x-0 !top-[88px] !z-50 !mt-0 !w-screen !animate-none !overflow-y-auto !rounded-none !border-x-0 !border-b !border-t !border-border !bg-background !p-0 !text-foreground !shadow-none !duration-0",
        heightClassName,
      )}
    >
      <div className="mx-auto grid w-[calc(100%-100px)] max-w-[1580px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-16 py-[50px]">
        <div className="grid grid-cols-2 content-start gap-x-16 gap-y-10">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="type-h5 w-fit rounded-sm text-foreground outline-none transition-colors hover:text-red-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5 self-start">
          {promos.map((promo) => (
            <PromoCard
              key={promo.title}
              promo={promo}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </NavigationMenuContent>
  );
}

function DesktopHeader() {
  const [openMenu, setOpenMenu] = useState("");
  const isMenuOpen = openMenu === "products" || openMenu === "about";

  return (
    <>
      <div className="mx-auto hidden h-[88px] w-[calc(100%-100px)] max-w-[1580px] grid-cols-[1fr_auto_1fr] items-center gap-8 xl:grid">
        <nav aria-label="Điều hướng chính" className="justify-self-start">
          <NavigationMenu
            value={openMenu}
            onValueChange={setOpenMenu}
            viewport={false}
            className="max-w-none justify-start"
          >
            <NavigationMenuList className="-ml-4 gap-0">
              <NavigationMenuItem value="products">
                <NavigationMenuTrigger className="h-11 rounded-md bg-transparent px-4 text-base font-bold hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent">
                  Products
                </NavigationMenuTrigger>
                <MegaMenuPanel
                  items={productMenuItems}
                  promos={promoCards}
                  heightClassName="!h-[min(632px,calc(100vh-136px))]"
                  onNavigate={() => setOpenMenu("")}
                />
              </NavigationMenuItem>

              <NavigationMenuItem value="about">
                <NavigationMenuTrigger className="h-11 rounded-md bg-transparent px-4 text-base font-bold hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent">
                  About us
                </NavigationMenuTrigger>
                <MegaMenuPanel
                  items={aboutMenuItems}
                  promos={aboutPromoCards}
                  heightClassName="!h-[min(388px,calc(100vh-88px))]"
                  onNavigate={() => setOpenMenu("")}
                />
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Button
                  asChild
                  variant="ghost"
                  className="h-11 rounded-md px-4 text-base font-bold hover:bg-transparent"
                >
                  <Link href={contactNavigationItem.href}>
                    {contactNavigationItem.label}
                  </Link>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="justify-self-center">
          <Brand />
        </div>

        <div className="flex items-center justify-self-end gap-1 xl:gap-2">
          <Button variant="ghost" className="gap-1 px-3 text-sm font-bold">
            EUR €
            <ChevronDown className="size-4" aria-hidden="true" />
          </Button>
          <Button variant="ghost" className="gap-2 px-3 text-sm font-bold">
            <span aria-hidden="true">🇬🇧</span>
            English
            <ChevronDown className="size-4" aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Tìm kiếm">
            <Search className="size-6" />
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="/auth/login" aria-label="Tài khoản">
              <CircleUserRound className="size-6" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart" aria-label="Giỏ hàng, 1 sản phẩm">
              <ShoppingBag className="size-6" />
              <Badge className="absolute -right-0.5 -top-0.5 size-5 border-0 bg-foreground p-0 text-[10px] font-bold text-background">
                1
              </Badge>
            </Link>
          </Button>
        </div>
      </div>

      {isMenuOpen ? (
        <button
          type="button"
          aria-label="Đóng menu điều hướng"
          className="fixed inset-x-0 bottom-0 top-[88px] z-40 hidden cursor-default bg-black/35 xl:block"
          onClick={() => setOpenMenu("")}
        />
      ) : null}
    </>
  );
}

function MobileHeader() {
  return (
    <div className="mx-auto grid h-16 w-[calc(100%-2rem)] grid-cols-[1fr_auto_1fr] items-center sm:w-[calc(100%-3rem)] sm:max-w-[620px] lg:max-w-[940px] xl:hidden">
      <div className="justify-self-start">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Mở menu"
              className="-ml-2"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[92vw] max-w-md overflow-y-auto p-0">
            <SheetHeader className="border-b px-5 py-6 text-left">
              <SheetTitle>
                <Brand />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Điều hướng cửa hàng MemoryShard
              </SheetDescription>
            </SheetHeader>

            <nav aria-label="Điều hướng mobile" className="space-y-8 px-5 py-7">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Products
                </p>
                <div className="grid gap-1">
                  {productMenuItems.map((item) => (
                    <Button
                      key={item.label}
                      asChild
                      variant="ghost"
                      className="h-auto justify-start px-0 py-2.5 text-base font-bold hover:bg-transparent hover:text-red-600"
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-5">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  About us
                </p>
                <div className="grid gap-1">
                  {aboutMenuItems.map((item) => (
                    <Button
                      key={item.label}
                      asChild
                      variant="ghost"
                      className="h-auto justify-start px-0 py-2.5 text-base font-bold hover:bg-transparent hover:text-red-600"
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-1 border-t pt-5">
                <Button
                  asChild
                  variant="ghost"
                  className="justify-start px-0 text-base font-bold hover:bg-transparent hover:text-red-600"
                >
                  <Link href={contactNavigationItem.href}>
                    {contactNavigationItem.label}
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="justify-self-center">
        <Brand />
      </div>

      <div className="flex items-center gap-0.5 justify-self-end -mr-2">
        <Button variant="ghost" size="icon" aria-label="Tìm kiếm">
          <Search className="size-5" />
        </Button>
        <Button asChild variant="ghost" size="icon" className="relative">
          <Link href="/cart" aria-label="Giỏ hàng, 1 sản phẩm">
            <ShoppingBag className="size-5" />
            <Badge className="absolute -right-0.5 -top-0.5 size-4 border-0 bg-foreground p-0 text-[9px] font-bold text-background">
              1
            </Badge>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background text-foreground">
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
}

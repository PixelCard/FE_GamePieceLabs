import type { FooterContent } from "@/features/navigation/types/footer-navigation";

export const footerContent: FooterContent = {
  brand: {
    name: "MEMORYSHARD",
    description:
      "Board game organizers and tabletop accessories made for smoother, more memorable game nights.",
  },
  navigationGroups: [
    {
      title: "Shop",
      links: [
        { label: "Organizers", href: "/products?group=organizers" },
        { label: "Sleeves", href: "/products?group=sleeves" },
        { label: "Tokens", href: "/products?group=tokens" },
        { label: "Accessories", href: "/products?group=accessories" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Payment & Shipping", href: "/shipping" },
        { label: "Returns", href: "/returns" },
      ],
    },
    {
      title: "Useful links",
      links: [
        { label: "Distributors", href: "/distributors" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  socialLinks: [
    { label: "Facebook", href: "#facebook", platform: "facebook" },
    { label: "Instagram", href: "#instagram", platform: "instagram" },
    { label: "YouTube", href: "#youtube", platform: "youtube" },
  ],
  currencyOptions: [
    { value: "EUR", label: "EUR €" },
    { value: "USD", label: "USD $" },
    { value: "GBP", label: "GBP £" },
  ],
  languageOptions: [
    { value: "en", label: "English", prefix: "🇬🇧" },
    { value: "vi", label: "Tiếng Việt", prefix: "🇻🇳" },
  ],
  defaultCurrency: "EUR",
  defaultLanguage: "en",
  paymentMethods: ["VISA", "Mastercard", "AMEX", "PayPal"],
  copyright: "© 2026 MemoryShard. All rights reserved.",
};

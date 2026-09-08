import type { FooterContent } from "@/features/navigation/types/footer-navigation";

export const footerContent: FooterContent = {
  navigationGroups: [
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
  certifications: {
    title: "Certifications",
    badges: [
      {
        label: "View DMCA.com protection status",
        href: "https://www.dmca.com/r/1q28p05",
        imageSrc: "/images/footer/dmca-protected.webp",
        imageAlt: "DMCA.com Protection Status",
        width: 121,
        height: 24,
      },
      {
        label: "View Ministry of Industry and Trade registration",
        href: "http://online.gov.vn/nen-tang/6b21bf2e-2bcb-4523-82c2-5acbf9404ec6",
        imageSrc: "/images/footer/bo-cong-thuong.png",
        imageAlt: "Registered with the Ministry of Industry and Trade",
        width: 230,
        height: 86,
      },
    ],
  },
  copyright: "© 2026 MemoryShard. All rights reserved.",
};
